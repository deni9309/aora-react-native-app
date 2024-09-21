import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'

import { colors, icons } from '../constants'
import { cn } from '../lib/utils'

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={cn('space-y-2', otherStyles)}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="flex flex-row items-center w-full h-16 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary px-4">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.gray200}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              alt="eye"
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
