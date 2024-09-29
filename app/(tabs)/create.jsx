import { Video, ResizeMode } from 'expo-av'
//import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CustomButton, FormField } from '../../components'
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import { createVideo } from '../../lib/appwrite'

const Create = () => {
  const { user } = useGlobalContext()
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  })

  const openPicker = async (selectedType) => {
    // const result = await DocumentPicker.getDocumentAsync({
    //   type:
    //     selectedType === 'image'
    //       ? ['image/png', 'image/jpg', 'image/jpeg']
    //       : ['video/mp4', 'video/gif', 'video/mov', 'video/avi'],
    // })
    const isImage = selectedType === 'image'

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: isImage
        ? ImagePicker.MediaTypeOptions.Images
        : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      if (selectedType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }

      if (selectedType === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }
    }
  }

  const submit = async () => {
    if (
      form.prompt === '' ||
      form.title === '' ||
      !form.video ||
      !form.thumbnail
    ) {
      return Alert.alert('ⓘ Please, fill in all the fields.')
    }

    setUploading(true)
    try {
      await createVideo({ ...form, userId: user.$id })

      Alert.alert('✔ Success', 'Video uploaded successfully.')
      router.push('/home')
    } catch (error) {
      Alert.alert(
        '✗ Error',
        error?.message || 'Something went wrong. Please try again.',
      )
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      })

      setUploading(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                //useNativeControls
                resizeMode={ResizeMode.COVER}
                //isLooping
              />
            ) : (
              <View className="flex items-center justify-center w-full h-40 bg-black-100 rounded-2xl border border-black-200 px-4">
                <View className="flex items-center justify-center w-14 h-14 border-secondary-100/50 border rounded-2xl px-4">
                  <Image
                    source={icons.upload}
                    alt="upload"
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                alt="video thumbnail"
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="flex flex-row justify-center items-center w-full h-16 bg-black-100 rounded-2xl border-2 border-black-200 px-4 space-x-2">
                <Image
                  source={icons.upload}
                  alt="upload"
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a File
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video..."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="✔ Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
