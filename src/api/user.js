import request from '@/utils/request'

export function getInfo(query) {
  return request({
    url: '/user/get',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'delete',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'update',
    data
  })
}
