import request from '@/http'

export function getUseInfo () {
  // notLogin token验证不通过时不需重跳登录页面
  return request.get('/user', { notLogin: true }).then(({ data }) => data)
}

export function register (data) {
  // notLogin token验证不通过时不需重跳登录页面
  return request.post('/user', data).then(({ data }) => data)
}

// 更新用户信息
export function updateUseInfo (id, data) {
  return request.post(`/user/${id}`, data).then(({ data }) => data)
}
