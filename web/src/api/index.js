import request from '@/http'

export function login (data) {
  return request.post('/login', data).then(({ data }) => data)
}
