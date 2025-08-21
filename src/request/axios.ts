import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

import type { SuccessResponse, ErrorResponse } from './response'
import { isValidApiResponse, isValidErrorResponse } from './response'

import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/auth'
import { toast } from 'li-daisy'
import { refreshToken } from '@/api/user'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10 * 1000,
})

let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}

// Add a request interceptor
instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
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
  function (response: AxiosResponse): AxiosResponse {
    const apiResponse = response.data

    // 验证API响应格式
    if (!isValidApiResponse(apiResponse)) {
      throw new Error('无效的响应格式')
    }

    // 业务逻辑失败时抛出错误
    if (apiResponse.code !== 2000) {
      const errResponse: ErrorResponse = {
        code: apiResponse.code,
        message: apiResponse.message || '业务处理失败',
        httpStatus: response.status,
      }
      throw errResponse
    }

    // 业务成功，将标准化的数据放回 response.data
    response.data = {
      code: apiResponse.code,
      message: apiResponse.message || '请求成功(default)',
      data: apiResponse.data,
      httpStatus: response.status,
    } as SuccessResponse

    return response
  },

  async function (error: AxiosError): Promise<ErrorResponse> {
    const errorResponse: ErrorResponse = {
      code: -1,
      message: '网络错误',
      httpStatus: 0,
    }

    // 保留原有请求
    const originalRequest = error.config

    if (
      error.response &&
      isValidErrorResponse(error.response.data) &&
      error.response.data.code === 1063 // 1063是token过期
    ) {
      if (!isRefreshing) {
        isRefreshing = true
        const rToken = getRefreshToken()
        if (!rToken) {
          return Promise.reject(errorResponse)
        }
        try {
          const res = await refreshToken(rToken)
          const data = res.data
          setAccessToken(data.access_token)
          setRefreshToken(data.refresh_token)
          onRefreshed(data.access_token)
          isRefreshing = false
        } catch (e) {
          isRefreshing = false
          removeAccessToken()
          removeRefreshToken()
          return Promise.reject(e)
        }
      }

      // 返回一个新的 Promise，等 token 刷新后重试原请求
      return new Promise((resolve, reject) => {
        if (!originalRequest) {
          reject(errorResponse)
          return
        }
        refreshSubscribers.push((token: string) => {
          if (originalRequest.headers) originalRequest.headers['Authorization'] = 'Bearer ' + token
          resolve(instance(originalRequest))
        })
      })
    }

    if (error.response) {
      // 1. 服务器返回了响应，但状态码是错误的（4xx, 5xx）
      // 例如：404 Not Found, 500 Internal Server Error
      // 这时 error.response.data 包含服务器返回的错误信息
      const apiResponse = error.response.data
      errorResponse.httpStatus = error.response.status

      if (isValidErrorResponse(apiResponse)) {
        errorResponse.code = apiResponse.code
        errorResponse.message = apiResponse.message

        // 检查 details
        if (apiResponse.details && typeof apiResponse.details === 'object') {
          errorResponse.details = apiResponse.details
        }
      } else {
        // 如果不是预期的错误格式，使用默认值
        errorResponse.code = error.response.status
        errorResponse.message = `HTTP请求错误，状态码: ${error.response.status}`
      }
    } else if (error.request) {
      // 2. 请求已发送但没有收到响应
      // 例如：网络断开、服务器无响应、超时
      // 这时 error.request 存在但 error.response 不存在
      errorResponse.message = '请求超时，请检查网络连接或联系管理员'
    } else {
      // 3. 请求配置错误，请求根本没有发送出去
      // 例如：URL 格式错误、请求拦截器出错、数据序列化失败
      // 这时 error.request 和 error.response 都不存在
      // 只能通过 error.message 获取错误信息
      errorResponse.message = error.message
    }

    toast.error(errorResponse.message)

    return Promise.reject(errorResponse)
  },
)

export default instance
