import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/meetingroom/info/get',
    method: 'get',
    params: query
  })
}

export function createRoom(data) {
  return request({
    url: '/meetingroom/info/create',
    method: 'post',
    data
  })
}

export function deleteRoom(data) {
  return request({
    url: '/meetingroom/info/delete',
    method: 'delete',
    data
  })
}

export function updateRoom(data) {
  return request({
    url: '/meetingroom/info/update',
    method: 'update',
    data
  })
}
