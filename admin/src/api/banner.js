import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/banner',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/v1/banner',
    method: 'get',
    params: { id }
  })
}

export function createBanner(data) {
  return request({
    url: '/v1/banner',
    method: 'post',
    data
  })
}

export function updateBanner(id, data) {
  return request({
    url: `/v1/banner/${id}`,
    method: 'post',
    data
  })
}

export function deleteBanner(id) {
  return request({
    url: `/v1/banner/${id}`,
    method: 'delete'
  })
}

