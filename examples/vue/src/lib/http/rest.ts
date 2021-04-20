import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Axios from 'axios'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type HttpResponse<T, E = undefined> = {
  wasSuccessful: boolean
  status: number
  data?: T
  error?: E | string
}

export interface RestBuilder {
  url(url: string): RestBuilder
  method(method: Method): RestBuilder
  param(key: string, value: string): RestBuilder
  data<D>(data: D): RestBuilder
  useBearer(token: string): RestBuilder
  send<T, E>(): Promise<HttpResponse<T, E>>
}

export type Rest = (config: AxiosRequestConfig) => RestBuilder

const fromResponse = <T, E = undefined>(
  response: AxiosResponse<T>,
): HttpResponse<T, E> => ({
  wasSuccessful: response.status < 400,
  status: response.status,
  data: response.data,
})

const fromError = <E, T = undefined>(
  error: AxiosError<E>,
): HttpResponse<T, E> => ({
  wasSuccessful: false,
  status: error.response?.status || 0,
  error: error.response?.data || error.name,
})

const queryParams = (params: Map<string, string>) => {
  if (params.size > 0) {
    let queryParamsString = '?'
    params.forEach((value, key) => {
      queryParamsString = queryParamsString + `${key}=${value}&`
    })
    return queryParamsString.slice(0, -1)
  }
  return ''
}

async function request<T, E>(
  config: AxiosRequestConfig = {},
): Promise<HttpResponse<T, E>> {
  try {
    const response = await Axios.request(config)
    return fromResponse<T, E>(response)
  } catch (error) {
    if ((error && error.response) || error.message === 'Network Error') {
      return fromError<E, T>(error)
    }
    throw error
  }
}

export const createRest: Rest = function (config: AxiosRequestConfig = {}) {
  const params: Map<string, string> = new Map<string, string>()
  return {
    url(url: string) {
      config = { ...config, url }
      return this
    },
    method(method: Method) {
      config = { ...config, method }
      return this
    },
    param(key: string, value: string) {
      params.set(key, value)
      return this
    },
    data<D>(data: D) {
      config = { ...config, data }
      return this
    },
    useBearer(token: string) {
      const headers = {
        ...config.headers,
        Authorization: 'Bearer ' + token,
      }
      config = { ...config, headers }
      return this
    },
    send() {
      return request({
        ...config,
        url: config.url + queryParams(params),
      })
    },
  }
}
