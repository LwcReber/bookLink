import request from '@/http'

export function getBanners () {
  return request.get('/banner', {}).then(({ data }) => data)
}

export function getBannerDetail (id) {
  return request.get('/banner/' + id).then(({ data }) => data)
}
