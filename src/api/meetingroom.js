import request from '@/utils/request'

export function getInfo(query) {
  return request({
    url: '/meetingroom/info',
    method: 'get',
    params: query
  })
}
