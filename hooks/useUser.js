import { useState, useEffect } from 'react'
import { Alert } from 'react-native'

import { getCurrentUser } from '../lib/appwrite'

/**
 * Custom hook that returns the currently logged in user
 * and a function to refresh the received user data
 * @returns {{user: Models.Document | undefined, refetch: () => void}} `{user, refetch}`
 */
const useUser = () => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await getCurrentUser()

      setUser(response)
    } catch (error) {
      Alert.alert('✗ Error ', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => fetchData()

  return { user, refetch }
}

export default useUser
