import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/v1/article/list',
    method: 'post',
    data
  })
}

export function fetchArticle(id) {
  return request({
    url: `/v1/article/${id}`,
    method: 'get'
  })
}

export function createArticle(data) {
  return request({
    url: '/v1/article',
    method: 'post',
    data
  })
}

export function updateArticle(id, data) {
  return request({
    url: `/v1/article/${id}`,
    method: 'post',
    data
  })
}
