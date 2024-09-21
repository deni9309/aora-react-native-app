import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

import { cn } from '../lib/utils'

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={cn(
        'justify-center items-center bg-secondary rounded-xl min-h-[62px]',
        containerStyles,
        isLoading && 'opacity-50',
      )}
      disabled={isLoading}
    >
      <Text className={cn('text-primary font-psemibold text-lg', textStyles)}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
