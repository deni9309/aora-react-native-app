import { ResizeMode, Video } from 'expo-av'
import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { icons } from '../constants'

const VideoCard = ({
  video: {
    title,
    thumbnail,
    prompt,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false)

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row items-start gap-3">
        <View className="flex flex-row flex-1 items-center justify-center">
          <View className="flex justify-center items-center w-[46px] h-[46px] rounded-lg border border-secondary p-0.5">
            <Image
              source={{ uri: avatar }}
              alt="creator avatar"
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex flex-1 justify-center gap-y-1 ml-3">
            <Text
              className="text-white font-psemibold text-sm"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image
            source={icons.menu}
            alt="menu"
            className="w-5 h-5"
            resizeMode="contain"
          />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          useNativeControls
          shouldPlay={true}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) setPlay(false)
          }}
          className="w-full h-60 rounded-xl mt-3"
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard
