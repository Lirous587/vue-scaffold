import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { getAccessToken } from './utils/auth'
import { toast } from 'li-daisy'

/**
 * 通用 API 响应结构
 * @template T data 字段的具体类型
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  // 使用泛型 T 来表示 data 的具体类型
  code: number
  msg: string
  data: T
}

const instance = axios.create({
  baseURL: '/api',
  timeout: 3000,
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    //往header头自动添加token
    // const token = getToken()
    const token = getAccessToken()

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  function (error: AxiosError) {
    return Promise.reject(error)
  },
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response: AxiosResponse) {
    const data = response.data as ApiResponse
    return data.data
  },
  function (error: AxiosError) {
    const data = error.response?.data as ApiResponse
    toast.error(data.msg)
    return Promise.reject(data)
  },
)

export default instance
