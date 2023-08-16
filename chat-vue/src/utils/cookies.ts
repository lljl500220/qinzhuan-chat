import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()
export const getToken = () => {
  return cookies.get('token')
}

export const setToken = (key = 'token', value: string) => {
  cookies.set(key, value)
}

export const removeToken = (key = 'token') => {
  cookies.remove(key)
}
