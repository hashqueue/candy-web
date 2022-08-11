import request from '@/utils/request'

export const getUserInfo = (userId) => {
  return request({
    url: `/system/users/${userId}/`,
    method: 'GET'
  })
}
