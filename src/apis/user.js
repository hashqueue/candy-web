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

export const resetUserPassword = (data) => {
  return request({
    url: `/system/users/reset-password/`,
    method: 'POST',
    data
  })
}

export const updateUserInfoWithUserId = (userId, data) => {
  return request({
    url: `/system/users/${userId}/`,
    method: 'PUT',
    data
  })
}

export const updateUserProfile = (data) => {
  return request({
    url: `/system/users/update-profile/`,
    method: 'PUT',
    data
  })
}
