import request from '@/utils/request'

export function getBookInfoList(query) {
  return request({
    url: '/book/info/get',
    method: 'get',
    params: query
  })
}

export function createBook(data) {
  return request({
    url: '/book/info/create',
    method: 'post',
    data
  })
}

export function deleteBook(data) {
  return request({
    url: '/book/info/delete',
    method: 'delete',
    data
  })
}

export function updateBook(data) {
  return request({
    url: '/book/info/update',
    method: 'update',
    data
  })
}
