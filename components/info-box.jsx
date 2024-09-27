import React from 'react'
import { View, Text } from 'react-native'

import { cn } from '../lib/utils'

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text
        className={cn('font-psemibold text-white text-center', titleStyles)}
      >
        {title}
      </Text>
      <Text className="text-sm font-pregular text-gray-100 text-center">
        {subtitle}
      </Text>
    </View>
  )
}

export default InfoBox
