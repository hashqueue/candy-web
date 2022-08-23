import request from '@/utils/request'

export const getUserInfo = (userId) => {
  return request({
    url: `/system/users/${userId}/`,
    method: 'GET'
  })
}

export const getUserProfile = () => {
  return request({
    url: `/system/users/profile/`,
    method: 'GET'
  })
}
