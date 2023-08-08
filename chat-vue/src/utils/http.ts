import { request } from './service'
// @ts-ignore
import { ElLoading } from 'element-plus'

export const post = (
  url: string,
  data?: any,
  isLoading = true
): Promise<any> => {
  return new Promise((resolve, reject) => {
    let loading: any = null
    if (isLoading) {
      loading = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.9)'
      })
    }
    request({
      url: url,
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

export const get = (
  url: string,
  data?: any,
  isLoading = true
): Promise<any> => {
  if (isLoading) {
    ElLoading.service({
      lock: true,
      text: '加载中',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: 'get',
      data
    })
      .then((res) => {
        resolve(res)
        ElLoading.service().close()
      })
      .catch((err) => {
        reject(err)
        ElLoading.service().close()
      })
  })
}
