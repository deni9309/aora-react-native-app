import { ID, Query, Models } from 'react-native-appwrite'

import { config, account, storage, avatars, databases } from './appwriteConfig'

/**
 * Creates a new user account and saves the user in the database.
 * Every database user has an `$id` and a corresponding `accountId`
 * Finally, logs the user in and returns the user data.
 * @param {string} email
 * @param {string} password
 * @param {string} username
 * @returns {Promise<Models.Document>} `newly created user`
 */
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      },
    )

    return newUser
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

/**
 * Creates a user session and returns the user data.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Models.Session>} `user session`
 */
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password)

    return session
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

/**
 * Signs the user out and deletes the current user session
 * @returns {Promise<{}>} `deleted session {}`
 */
export async function signOut() {
  try {
    const session = await account.deleteSession('current')

    return session
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Returns currently logged in user or `undefined`
 * @returns {Promise<Models.Document | undefined>} `user | undefined`
 */
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    console.error(error)
  }
}

/**
 * Returns all videos sorted desc by `$createdAt` property
 * @returns {Promise<Models.Document[]>} `videos`
 */
export async function getAllVideos() {
  try {
    const videos = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt')],
    )

    return videos.documents
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

/**
 * Returns **latest 7** videos sorted desc by `$createdAt` property
 * @returns {Promise<Models.Document[]>} `videos`
 */
export async function getLatestVideos() {
  try {
    const latestVideos = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))],
    )

    return latestVideos.documents
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

/**
 * Returns an array of videos that match the query (**case insensitive**)
 * @param {string} query
 * @returns {Promise<Models.Document[]>} `query result`
 */
export async function searchVideos(query) {
  try {
    const result = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search('title', query)],
    )

    return result.documents
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

/**
 * Returns array of videos (`Promise<Models.Document[]>`)
 * for the specific user by `$id`
 * @param {string} userId
 * @returns {Promise<Models.Document[]>} `user videos`
 */
export async function getUserVideos(userId) {
  try {
    const videos = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal('creator', userId), Query.orderDesc('$createdAt')],
    )

    return videos.documents
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

/**
 * Returns the `preview url` of the uploaded file
 * @param {string} fileId
 * @param {'image'|'video'} type
 * @returns {Promise<URL>}
 */
export async function getFilePreview(fileId, type) {
  let fileUrl
  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(config.storageId, fileId)
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        'top',
        100,
      )
    } else {
      throw new Error('Invalid file type')
    }

    if (!fileUrl) throw Error

    return fileUrl
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Uploads a file into the appwrite storage and returns the file preview URL
 *
 * Supported types:
 * **`image: .jpg .jpeg .png`**
 * **`video: .mp4 .gif .avi .mov`**
 * @param {*} file
 * @param {'image'|'video'} type
 * @returns
 */
export async function uploadFile(file, type) {
  if (!file) return

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset,
    )

    const fileUrl = await getFilePreview(uploadedFile.$id, type)

    return fileUrl
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Creates (uploads and saves) new video into appwrite database
 * @param {FormData} form
 * @returns {Promise<Models.Document>} `created video`
 */
export async function createVideo(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ])

    const newVideo = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      },
    )

    return newVideo
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}
