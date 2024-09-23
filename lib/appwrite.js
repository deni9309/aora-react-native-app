import {
  Account,
  Avatars,
  Client,
  Storage,
  ID,
  Query,
  Databases,
} from 'react-native-appwrite'

import db from '../constants/constants.secret'

export const config = {
  endpoint: db.APPWRITE_PUBLIC_ENDPOINT,
  platform: 'com.your.aora',
  projectId: db.APPWRITE_PROJECT_ID,
  databaseId: db.APPWRITE_DATABASE_ID,
  userCollectionId: db.USER_COLLECTION_ID,
  videoCollectionId: db.VIDEO_COLLECTION_ID,
  storageId: db.STORAGE_ID,
}

// Init react-native SDK
const client = new Client()

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)

const account = new Account(client)
const storage = new Storage(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

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
