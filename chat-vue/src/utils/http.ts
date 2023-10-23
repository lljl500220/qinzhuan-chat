import { request } from './service'
import { ElLoading } from 'element-plus'

export const post = async (
  url: string,
  data = {},
  isLoading = true
): Promise<any> => {
  return await new Promise((resolve, reject) => {
    let loading: any = null
    if (isLoading) {
      loading = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.9)'
      })
    }
    request({
      url,
      method: 'post',
      data
    })
      .then((res) => {
        resolve(res)
        if (loading) {
          loading.close()
        }
      })
      .catch((err) => {
        reject(err)
        if (loading) {
          loading.close()
        }
      })
  })
}

export const get = async (
  url: string,
  data?: any
): Promise<any> => {
  return await new Promise((resolve, reject) => {
    request({
      url,
      method: 'get',
      params: data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
