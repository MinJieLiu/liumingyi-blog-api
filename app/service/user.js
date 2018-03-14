const egg = require('egg');
const crypto = require('crypto');


const assemblyMenu = require('../util/assembly_menu');

module.exports = class extends egg.Service {
  async update(id, body) {
    const { roleIds } = body;
    const { User, Role } = this.ctx.model;
    let user = await User.findById(id);
    if (!user) {
      throw new Error('未找到用户');
    }
    // 有密码则加密修改
    const { password } = body;
    if (password) {
      Object.assign(body, {
        password: crypto.createHash('md5').update(password).digest('hex'),
      });
    }
    // 更新
    user = await user.update(body);
    const data = user.get({ plain: true });
    // 更新关系
    if (roleIds) {
      const roles = await Role.findAll({
        where: { id: { $in: roleIds } },
      });
      await user.setRoles(roles);
      data.roles = roles;
    }
    return data;
  }

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
