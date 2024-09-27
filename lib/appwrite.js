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
 * Returns all videos
 * @returns {Promise<Models.Document[]>} `videos`
 */
export async function getAllVideos() {
  try {
    const videos = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
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
      [Query.equal('creator', userId)],
    )

    return videos.documents
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}
