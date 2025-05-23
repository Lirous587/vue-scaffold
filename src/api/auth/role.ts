import axios from '@/axios'

export interface Role {
  id: number
  name: string
  description: string
}

export interface RoleCreateReq {
  name: string
  description: string
}

export interface RoleUpdateReq {
  name?: string
  description?: string
}

export interface RoleListReq {
  page?: number
  page_size?: number
  name?: string
}

export interface RoleListRes {
  list: Role[]
  total: number
  page: number
  page_size: number
}

// 创建角色
export const createRole = (req: RoleCreateReq): Promise<Role> => {
  return axios.post('/v1/role', req)
}

// 获取角色列表
export const getRoleList = (params?: RoleListReq): Promise<RoleListRes> => {
  return axios.get('/v1/role', { params })
}

// 获取角色详情
export const getRoleById = (id: number): Promise<Role> => {
  return axios.get(`/v1/role/${id}`)
}

// 更新角色
export const updateRole = (id: number, req: RoleUpdateReq): Promise<Role> => {
  return axios.put(`/v1/role/${id}`, req)
}

// 删除角色
export const deleteRole = (id: number): Promise<void> => {
  return axios.delete(`/v1/role/${id}`)
}

// 批量删除角色
export const batchDeleteRoles = (ids: number[]): Promise<void> => {
  return axios.delete('/v1/role/batch', { data: { ids } })
}
