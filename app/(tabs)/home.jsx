import React from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import EmptyState from '../../components/empty-state'
import SearchInput from '../../components/search-input'
import Trending from '../../components/trending'
import { images } from '../../constants'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        // data={[{ $id: 1 }, { $id: 2 }, { $id: 3 }]}
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-xl text-white">{item.$id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
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

              <Trending posts={[{ $id: 1 }, { $id: 2 }, { $id: 3 }] ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video!"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Home
