import request from '@/http'

export function getArticles (data = {}) {
  return request.post('/article/list', data).then(({ data }) => data)
}

export function getUserArticles (id, params) {
  return request.get(`/article/list/${id}`, { params }).then(({ data }) => data)
}
// 文章详情
export function articleDetail (id) {
  return request.get('/article/' + id).then(({ data }) => data)
}

// 发布文章
export function publishArticle (data) {
  return request.post('/article/', data).then(({ data }) => data)
}
