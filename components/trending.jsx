import React from 'react'
import { View, Text, FlatList } from 'react-native'
import * as Animatable from 'react-native-animatable'

const Trending = ({ videos }) => {
  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-xl text-white">{item.$id}</Text>
      )}
      horizontal
    />
  )
}

export default Trending
