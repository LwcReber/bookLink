import request from '@/http'

export function getUseInfo (data) {
  return request.get('/user').then(({ data }) => data)
}
