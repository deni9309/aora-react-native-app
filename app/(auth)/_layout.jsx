import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

//import { Loader } from '../../components'
import { colors } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'

const AuthLayout = () => {
  const { loading, isLoggedIn } = useGlobalContext()

  if (!loading && isLoggedIn) return <Redirect href="/home" />

  return (
    <>
      <Stack>
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor={colors.primary} style="light" />
    </>
  )
}

export default AuthLayout
