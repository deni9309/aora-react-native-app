import {
  Account,
  Avatars,
  Client,
  Storage,
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

export const account = new Account(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)
export const databases = new Databases(client)
