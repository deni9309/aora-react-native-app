import React from 'react'
import { View, Text, FlatList } from 'react-native'

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-xl text-white">{item.$id}</Text>
      )}
      horizontal
    />
  )
}

export default Trending
