import { get, post } from '../utils/http'
export const addFriendApi = async (data: any) => {
  return await post('/friend', data)
}

export const findUserApi = async (data: any) => {
  return await get('/users/findUser', data)
}

export const findAllFriendApi = async () => {
  return await get('/friend', {})
}
