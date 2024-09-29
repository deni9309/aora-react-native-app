import { router } from 'expo-router'
import React from 'react'
import { View, Image, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { EmptyState, VideoCard, InfoBox } from '../../components'
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import useFetch from '../../hooks/useFetch'
import { getUserVideos, signOut } from '../../lib/appwrite'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: videos } = useFetch(() => getUserVideos(user?.$id))

  const logout = async () => {
    await signOut()

    setUser(null)
    setIsLoggedIn(false)

    router.replace('/signin')
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="You have not created any videos yet"
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex justify-center items-center w-full mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex items-end w-full mb-10"
            >
              <Image
                source={icons.logout}
                alt="logout"
                resizeMode="contain"
                className="w-6 h-6 mr-1"
              />
            </TouchableOpacity>

            <View className="flex justify-center items-center w-16 h-16 border border-secondary rounded-lg">
              <Image
                source={{ uri: user?.avatar }}
                alt={user?.username ?? 'profile image'}
                resizeMode="cover"
                className="w-[90%] h-[90%] rounded-lg"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="flex flex-row mt-5">
              <InfoBox
                title={videos.length || 0}
                subtitle="Videos"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              {/* Number of followers */}
              <InfoBox
                title={'1.2k'}
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Profile
