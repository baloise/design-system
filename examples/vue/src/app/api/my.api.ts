import { $axios } from '@baloise/vue-axios'
import { AxiosRequestConfig } from 'axios'

const myApiConfig: AxiosRequestConfig = {
  baseURL: '/api',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

export const myApi = $axios.create(myApiConfig)

// myApi.post('/users', { name: 'Tony' })
