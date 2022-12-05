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

const convertRouteData = (originData, key) => {
  const modules = import.meta.glob(['../views/**/*.vue', '../layout/**/*.vue'])
  const tmpParent = {}
  tmpParent.path = originData[key]['path']
  tmpParent.name = originData[key]['path']
  tmpParent.component = modules[originData[key]['component']]
  // tmpParent.component = () => import(originData[key]['component'])
  if (originData[key]['redirect'] !== '') {
    tmpParent.redirect = originData[key]['redirect']
  }
  tmpParent.meta = {}
  tmpParent['meta']['title'] = originData[key]['title']
  tmpParent['meta']['icon'] = originData[key]['icon']
  tmpParent['meta']['is_visible'] = originData[key]['is_visible']
  return tmpParent
}
export const generateRouteTreeData = (originDataArr) => {
  const treeObj = {}
  const treeMenuData = []
  const otherMenu = []
  for (const item of originDataArr) {
    if (item['meta']['id']) {
      treeObj[item['meta']['id']] = item
    } else {
      otherMenu.push(item)
    }
  }
  for (const key of Object.keys(treeObj)) {
    if (treeObj[key]['meta']['parentId'] !== null) {
      const pid = treeObj[key]['meta']['parentId']
      const parent_data = treeObj[pid]
      parent_data.children.push(treeObj[key])
    } else {
      // treeObj[key].children = []
      treeMenuData.push(treeObj[key])
    }
  }
  // return otherMenu
  return [...otherMenu, ...treeMenuData]
}

export const generateRouteData = (originDataArr) => {
  const treeObj = {}
  const treeMenuData = []
  for (const item of originDataArr) {
    treeObj[item.id] = item
  }
  for (const key of Object.keys(treeObj)) {
    if (treeObj[key]['parent'] !== null) {
      const pid = treeObj[key]['parent']
      const parent_data = treeObj[pid]
      const tmpChildren = convertRouteData(treeObj, key)
      tmpChildren.meta.parent = parent_data.path
      tmpChildren.meta.id = treeObj[key]['id']
      tmpChildren.meta.parentId = parent_data['id']
      treeMenuData.push(tmpChildren)
    } else {
      const tmpParent = convertRouteData(treeObj, key)
      tmpParent.meta.parent = null
      tmpParent.meta.parentId = null
      tmpParent.meta.id = treeObj[key]['id']
      treeMenuData.push(tmpParent)
    }
  }
  // console.log(treeMenuData)
  return treeMenuData
}
