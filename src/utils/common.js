export const generatePermissionTreeData = (originTreeData) => {
  const treeData = []
  for (const item of originTreeData) {
    if (item.title && item.id) {
      const tmpData = {}
      tmpData.key = item.id
      tmpData.title = item.title
      tmpData.is_menu = item.is_menu
      if (item.children) {
        tmpData.children = generatePermissionTreeData(item.children)
      }
      treeData.push(tmpData)
    }
  }
  return treeData
}

export const generateOrganizationTreeData = (originTreeData) => {
  const treeData = []
  for (const item of originTreeData) {
    if (item.name && item.id) {
      const tmpData = {}
      tmpData.value = item.id
      tmpData.title = item.name
      if (item.children) {
        tmpData.children = generateOrganizationTreeData(item.children)
      }
      treeData.push(tmpData)
    }
  }
  return treeData
}
