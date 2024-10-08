import { ResizeMode, Video } from 'expo-av'
import React, { useState } from 'react'
import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native'
import * as Animatable from 'react-native-animatable'

import { icons } from '../constants'

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.05,
  },
}

const zoomOut = {
  0: {
    scale: 1.05,
  },
  1: {
    scale: 0.9,
  },
}

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false)

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          useNativeControls
          shouldPlay={true}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) setPlay(false)
          }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 overflow-hidden shadow-lg shadow-black/40 rounded-[33px] my-5"
            resizeMode="cover"
            alt={item.title ?? 'video thumbnail'}
          />
          <Image
            source={icons.play}
            alt="play"
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

const Trending = ({ videos }) => {
  const [activeItem, setActiveItem] = useState(videos[1])

  const viewableItemsChanges = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanges}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  )
}

export default Trending
