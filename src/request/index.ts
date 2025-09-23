import type { SuccessResponse } from './response'
import instance from './axios'
import type { AxiosRequestConfig } from 'axios'

const request = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<SuccessResponse<T>> => {
    const response = await instance.get<SuccessResponse<T>>(url, config)
    return response.data
  },
  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<SuccessResponse<T>> => {
    const response = await instance.post<SuccessResponse<T>>(url, data, config)
    return response.data
  },
  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<SuccessResponse<T>> => {
    const response = await instance.put<SuccessResponse<T>>(url, data, config)
    return response.data
  },
  delete: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<SuccessResponse<T>> => {
    const response = await instance.delete<SuccessResponse<T>>(url, config)
    return response.data
  },
  patch: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<SuccessResponse<T>> => {
    const response = await instance.patch<SuccessResponse<T>>(url, data, config)
    return response.data
  },
}

export default request
