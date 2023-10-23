import { post } from '../utils/http'

interface User {
  username: string
  password: string
}
export const login = async (user: User): Promise<any> => {
  return await post('/auth/login', user, false)
}

export const register = async (user: User): Promise<any> => {
  return await post('/auth/register', user)
}

export const getUserInfo = async (): Promise<any> => {
  return await post('/auth/getUserInfo', {})
}
