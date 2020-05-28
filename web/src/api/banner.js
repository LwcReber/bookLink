import request from '@/http'

export function getBanners () {
  return request.get('/banner', {}).then(({ data }) => data)
}
