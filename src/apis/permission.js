import request from '@/utils/request'

export const getRolesPermissions = (data) => {
  return request({
    url: '/system/permissions/get-roles-permissions/',
    method: 'POST',
    data
  })
}
