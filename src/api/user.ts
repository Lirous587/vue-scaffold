import instance from '@/axios'

/**
 * githubLogin API 响应中 data 字段的结构
 */

interface UserPayload {
  id: string
  login_type: string
}

export interface GithubLoginData {
  token: string
  refresh_token: string
  payload: UserPayload
}

export const githubLogin = (code: string): Promise<GithubLoginData> => {
  return instance.post('/v1/user/login?type=github', {
    code: code,
  })
}

export const validateAuth = () => {
  return instance.post('/v1/user/auth')
}

export const getMunus = () => {}
