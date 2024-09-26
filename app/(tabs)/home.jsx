import React, { useState } from 'react'
import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import EmptyState from '../../components/empty-state'
import SearchInput from '../../components/search-input'
import Trending from '../../components/trending'
import VideoCard from '../../components/video-card'
import { images } from '../../constants'
import useFetch from '../../hooks/useFetch'
import { getAllVideos, getLatestVideos } from '../../lib/appwrite'

const Home = () => {
  const { data: videos, refetch } = useFetch(getAllVideos)
  const [refreshing, setRefreshing] = useState(false)

  const { data: latestVideos, refetch: refetchLatestVideos } =
    useFetch(getLatestVideos)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        scrollEnabled
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex flex-row items-start justify-between mb-6">
              <View className="whitespace-nowrap">
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back,{' '}
                </Text>
                <Text className="text-2xl font-psemibold text-white">User</Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  alt="Aora Logo"
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput placeholder="Search for a video topic" />

            <View className="flex-1 w-full pt-5 pb-8">
              <Text className="text-lg font-pregular mb-3 text-gray-100">
                Latest Videos
              </Text>

              <Trending videos={latestVideos ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video!"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  )
}

export default Home
