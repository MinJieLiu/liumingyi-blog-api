const egg = require('egg');

const assemblyMenu = require('../util/assemble_menu');

module.exports = class extends egg.Service {
  async userMenus(id) {
    const { User, Role, Menu } = this.ctx.model;
    // 所有菜单
    const allMenu = await this.ctx.service.menu.findAll();
    // 拥有的菜单
    const ownMenu = await Menu.findAll({
      attributes: ['id', 'parentId'],
      include: [{
        model: Role,
        attributes: [],
        required: true,
        include: [{
          model: User,
          attributes: [],
          where: { id },
          required: true,
        }],
      }],
    });
    // 生成类菜单树
    return assemblyMenu(ownMenu, allMenu);
  }
};
