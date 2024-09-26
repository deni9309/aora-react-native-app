import { router, usePathname } from 'expo-router'
import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'

import { colors, icons } from '../constants'

const SearchInput = ({ initialQuery, placeholder }) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery || '')

  const onSearchPress = () => {
    if (!query) {
      Alert.alert(
        'Missing query',
        'Please, type something to search results across database.',
      )
    }

    if (pathname.startsWith('/search')) {
      router.setParams({ query })
    } else {
      router.push(`/search/${query}`)
    }
  }

  return (
    <View className="flex flex-row items-center w-full h-16 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary space-x-4 px-4">
      <TextInput
        className="flex-1 font-pregular text-base text-white mt-0.5"
        value={query}
        placeholder={placeholder ?? 'Search...'}
        placeholderTextColor={colors.gray100}
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity onPress={onSearchPress}>
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
