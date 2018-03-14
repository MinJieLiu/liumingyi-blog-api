/**
 * 递归生成拥有权限的菜单树
 * @param {Array} ownMenu - 已拥有的菜单
 * @param {Array} allMenu - 所有菜单
 * @return {Array} result - 拥有的菜单树
 */
const filterMenu = (ownMenu, allMenu) => {
  const result = allMenu
    .filter(item => ownMenu.some(n => n.id === item.id || n.parentId === item.id));

  return result.length > ownMenu.length ? filterMenu(result, allMenu) : result;
};

module.exports = filterMenu;
