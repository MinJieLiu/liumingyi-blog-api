const egg = require('egg');

const assembleCondition = require('../util/assemble_condition');
const computePage = require('../util/compute_page');

module.exports = class extends egg.Service {
  /**
   * 分页查询
   * @param {Object} query - 参数
   * @return {Promise} - result
   */
  async findAndCountAll(query = {}) {
    const { defaultPage, defaultSize } = this.config.pages;
    const {
      page = defaultPage,
      size = defaultSize,
      name,
    } = query;

    const { offset, limit } = computePage(page, size);

    // Query
    return this.ctx.model.Role.findAndCountAll({
      include: [{
        model: this.ctx.model.Menu,
        through: { attributes: [] },
      }],
      where: Object.assign(
        {},
        assembleCondition({ name: { $like: `${name}%` } }, name),
      ),
      offset,
      limit,
      order: [
        ['sort', 'ASC'],
      ],
    });
  }

  /**
   * 列表查询
   * @param {Object} query - 参数
   * @return {Promise} - result
   */
  async findAll(query = {}) {
    const {
      name,
    } = query;

    // Query
    return this.ctx.model.Role.findAll({
      where: Object.assign(
        {},
        assembleCondition({ name: { $like: `${name}%` } }, name),
      ),
      order: [
        ['sort', 'ASC'],
      ],
    });
  }

  async create(body) {
    const { menuIds } = body;
    const { Role, Menu } = this.ctx.model;
    const role = await Role.create(body);
    // 建立关系
    const data = role.get({ plain: true });
    if (menuIds) {
      const menus = await Menu.findAll({
        where: { id: { $in: menuIds } },
      });
      await role.setMenus(menus);
      data.menus = menus;
    }
    return data;
  }

  async update(id, body) {
    const { menuIds } = body;
    const { Role, Menu } = this.ctx.model;
    let role = await Role.findById(id);
    // 更新
    role = await role.update(body);
    const data = role.get({ plain: true });
    // 更新关系
    if (menuIds) {
      const menus = await Menu.findAll({
        where: { id: { $in: menuIds } },
      });
      await role.setMenus(menus);
      data.menus = menus;
    }
    return data;
  }
};
