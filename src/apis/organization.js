import request from '@/utils/request'

export const getOrganizationList = () => {
  return request({
    url: `/system/organizations/`,
    method: 'GET'
  })
}
