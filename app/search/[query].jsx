import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { EmptyState, SearchInput, VideoCard } from '../../components'
import useFetch from '../../hooks/useFetch'
import { searchVideos } from '../../lib/appwrite'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: videos, refetch } = useFetch(() => searchVideos(query))

  const [refreshing, setRefreshing] = useState(false)

  const refresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  useEffect(() => {
    refresh()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        scrollEnabled
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white mt-1">
              {query}
            </Text>

            <View className="mt-6 mb-8">
              <SearchInput
                initialQuery={query}
                placeholder="Search for a video topic"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No worries. Try search something else..."
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
    </SafeAreaView>
  )
}

export default Search
