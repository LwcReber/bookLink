import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/v1/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function upload(data) {
  const param = new FormData()
  param.append('file', data)
  return request({
    url: '/v1/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data' // 文件上传时的格式
    },
    data: param
  })
}

