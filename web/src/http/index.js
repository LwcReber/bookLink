import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const instance = axios.create({
  baseURL: '/api/v1',
  timeout: 10000
})

// 请求拦截
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response)
  const res = response.data
  if (res.code === 0) {
    return response
  } else {
    Message.closeAll()
    Message({ message: res.msg, type: 'error' })
  }
}, (error) => {
  try {
    const config = error.config
    console.log(config)
    const response = error.response
    let showErr = true
    if (response) {
      switch (error.response.status) {
        case 401:
          // 清空
          if (!(config.hasOwnProperty('notLogin') && config.notLogin)) {
            store.dispatch('user/logout')
          }
          showErr = false
          break
          // 跳转
        case 400:
          error.message = '错误请求'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误'
          break
        case 500:
          error.message = '服务端出错'
          break
      }
    } else {
      error.message = '网络异常'
    }
    showErr && Message({ message: error.message, type: 'error' })
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default instance
