import { useState, useEffect } from 'react'
import { Alert } from 'react-native'

/**
 * Custom hook that acccepts a fetch function as a parameter and returns
 * the equivalent models document collection from appwrite database
 * and a function to refresh the received data
 * @param {()=>Promise<Models.Document[]>} `fn`
 * @returns {{data: Models.Document[] | undefined, refetch: () => Promise<void>}} `{data, refetch}`
 */
const useFetch = (fn) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await fn()

      setData(response)
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

  return { data, refetch }
}

export default useFetch
