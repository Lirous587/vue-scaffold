import axios from '@/axios'

interface UserPayload {
  id: string
}

export interface GithubLoginData {
  access_token: string
  refresh_token: string
  payload: UserPayload
}

// api/user/auth/github
export const githubLogin = (code: string): Promise<GithubLoginData> => {
  return axios.post('/v1/user/auth/github', {
    code: code,
  })
}

export const validateAuth = () => {
  return axios.post('/v1/user/auth')
}

export const getMunus = () => {}
