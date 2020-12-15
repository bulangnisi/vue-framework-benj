import axios from 'axios'
import store from '@/store'
import { download } from './index'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 90000, // request timeout
  method: 'POST',
  headers: {
    platformType: process.env.VUE_APP_PLATFORM_TYPE,
    IntegererfaceVersion: process.env.VUE_APP_INTEGERERFACE_VERSION
  },
  // silent Boolean silent loading
  silent: false,
  // errorMessage Boolean show error message
  errorMessage: true,
  // successMessage Boolean show success message
  successMessage: false
})
// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (config.upload) {
      config.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8'
      const temp = new FormData()
      for (const key in config.data) {
        const value = config.data[key]
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            if (value[i] || value[i] === 0) {
              temp.append(key, value[i])
            }
          }
        } else {
          if (value || value === 0) {
            temp.append(key, value)
          }
        }
      }
      config.data = temp
    }
    if (!config.silent) {
      store.dispatch('app/setLoading', 1)
    }
    if (process.env.NODE_ENV === 'development') {
      console.log(`request ${config.url} \n`, { ...config.data })
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    if (!response.config.silent) {
      store.dispatch('app/setLoading', -1)
    }
    const res = response.data
    const { errorMessage, successMessage } = response.config
    if (response.config.responseType === 'blob') {
      download(response)
      return null
    } else if (response.config.responseType === 'arraybuffer') {
      return res
    } else if (res.code !== 0 && errorMessage) {
      const msg = res.msg || 'Unknown Error'
      // TODO: print message
      return Promise.reject(msg)
    } else {
      if (successMessage) {
        // TODO: print message
        // const msg = res.msg || '操作成功'
      }
      return res
    }
  },
  (error) => {
    store.dispatch('app/setLoading', -1)
    console.log('err ' + error.message) // for debug
    let msg = error.message
    if (msg.indexOf('timeout') >= 0) {
      msg = '请求超时'
    }
    // TODO: print message
    return Promise.reject(error)
  }
)

export default service
