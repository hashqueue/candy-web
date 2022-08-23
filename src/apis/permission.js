import request from '@/utils/request'

export const getUserPermissions = () => {
  return request({
    url: '/system/permissions/get-user-permissions/',
    method: 'GET'
  })
}
