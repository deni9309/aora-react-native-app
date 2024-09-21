import { Redirect, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View, ScrollView, Image, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CustomButton from '../components/custom-button'
import { images, colors } from '../constants'

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="justify-center items-center h-full w-full px-4">
          <Image
            source={images.logo}
            alt="Aora Logo"
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />

          <Image
            source={images.cards}
            alt="Aora cards"
            resizeMode="contain"
            className="w-full max-w-[380px] h-[300px]"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{'\n'}Possibilities with{' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              alt="Orange path"
              resizeMode="contain"
              className="absolute w-[136px] h-[15px] -bottom-2 -right-8"
            />
          </View>
          <Text className="text-sm text-center font-pregular text-gray-100 mt-7">
            Where creativity meets innovation: embark on a journey of limitless
            exploration Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor={colors.primary} style="light" />
    </SafeAreaView>
  )
}
