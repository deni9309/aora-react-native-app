import { router } from 'expo-router'
import React from 'react'
import { View, Text, Image } from 'react-native'

import CustomButton from './custom-button'
import { images } from '../constants'

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        alt="empty"
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl font-psemibold text-center text-white mb-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButton
        title="Create Video"
        onPress={() => router.push('/create')}
        containerStyles="w-full my-5"
      />
    </View>
  )
}

export default EmptyState
