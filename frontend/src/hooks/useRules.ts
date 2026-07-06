import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const useRules = () => {
  return useQuery('rules', async () => {
    const { data } = await axios.get(`${API_URL}/api/rules`)
    return data
  })
}

export const useCreateRule = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (rule: any) => axios.post(`${API_URL}/api/rules`, rule),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('rules')
      },
    }
  )
}

export const useInference = () => {
  return useMutation((scenario: string) =>
    axios.post(`${API_URL}/api/inference`, { scenario })
  )
}
