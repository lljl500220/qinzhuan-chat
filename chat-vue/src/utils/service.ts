import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { get } from 'lodash-es'
import { ElMessage } from 'element-plus'
import { getToken } from './cookies'
import router from '../router'

/** 创建请求实例 */
function createService () {
  // 创建一个 Axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    // 发送失败
    async (error) => {
      return await Promise.reject(error)
    }
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      // apiData 是 API 返回的数据
      const apiData = response.data
      // 这个 Code 是和后端约定的业务 Code
      const code = apiData.code
      // 如果没有 Code, 代表这不是项目后端开发的 API
      switch (code) {
        case 0:
          // code === 0 代表没有错误
          return apiData.data
        default:
          // 不是正确的 Code
          ElMessage.error(apiData.error || 'Error')
          return Promise.reject(apiData.error || 'Error')
      }
    },
    async (error) => {
      // Status 是 HTTP 状态码
      const status = get(error, 'response.status')
      switch (status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '身份验证失效，请重新登录'
          router.push({ path: '/login' }).then(() => {
          }).catch(() => {
            ElMessage.error('导航至登录页失败，4s后将为你刷新页面')
            setTimeout(() => {
              location.reload()
            }, 4000)
          })
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求地址出错'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP 版本不受支持'
          break
        default:
          break
      }
      ElMessage.error(error.message)
      return await Promise.reject(error)
    }
  )
  return service
}

/** 创建请求方法 */
function createRequestFunction (service: AxiosInstance) {
  return async function <T>(config: AxiosRequestConfig): Promise<T> {
    const configDefault = {
      headers: {
        // 携带 Token
        Authorization: 'Bearer ' + getToken(),
        'Content-Type': get(config, 'headers.Content-Type', 'application/json')
      },
      timeout: 50000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    return await service(Object.assign(configDefault, config))
  }
}

/** 用于网络请求的实例 */
export const service = createService()
/** 用于网络请求的方法 */
export const request = createRequestFunction(service)
