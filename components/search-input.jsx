import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'

import { colors, icons } from '../constants'
import { cn } from '../lib/utils'

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}) => {
  
  return (
    <View className="flex flex-row items-center w-full h-16 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary space-x-4 px-4">
      <TextInput
        className="flex-1 font-pregular text-base text-white mt-0.5"
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.gray200}
        onChangeText={handleChangeText}
      />

      <TouchableOpacity onPress={() => {}}>
        <Image
          source={icons.search}
          alt="search"
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
