export const generateTreeData = (originTreeData) => {
  const treeData = []
  for (const item of originTreeData) {
    if (item.title && item.id) {
      const tmpData = {}
      tmpData.key = item.id
      tmpData.title = item.title
      tmpData.is_menu = item.is_menu
      if (item.children) {
        tmpData.children = generateTreeData(item.children)
      }
      treeData.push(tmpData)
    }
  }
  return treeData
}
