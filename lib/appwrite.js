import { ID, Query } from 'react-native-appwrite'

import { config, account, storage, avatars, databases } from './appwriteConfig'

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

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password)

    return session
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

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

export async function getAllVideos() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
    )

    return posts.documents
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

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
