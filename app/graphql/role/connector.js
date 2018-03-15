const DataLoader = require('dataloader');

const assembleCondition = require('../../util/assemble_condition');
const computePage = require('../../util/compute_page');

class RoleConnector {
  constructor(ctx) {
    this.ctx = ctx;

    this.loader = new DataLoader(id => this.show(id));

    this.roleLoader = new DataLoader(id => this.showByUserId(id));
  }

  async show(idArr) {
    const list = await this.ctx.model.Role.findAll({
      where: {
        id: idArr,
      },
      raw: true,
    });
    return idArr.map(currentId => list.find(n => String(n.id) === currentId));
  }

  async showByUserId(userIdArr) {
    const { User, Role } = this.ctx.model;
    const list = await Role.findAll({
      include: [{
        model: User,
        attributes: ['id'],
        where: { id: userIdArr },
        required: true,
      }],
      raw: true,
    });
    return userIdArr.map(currentId => list.filter(n => n['users.id'] === currentId));
  }

  find(id) {
    return this.loader.load(id);
  }

  findByUserId(userId) {
    return this.roleLoader.load(userId);
  }

  /**
   * 分页查询
   * @param {Object} query - 参数
   * @return {Promise} - result
   */
  async findAndCountAll(query = {}) {
    const {
      config: { pages: { defaultPage, defaultSize } },
      Sequelize: { Op },
    } = this.ctx.app;
    const {
      page = defaultPage,
      size = defaultSize,
      name,
    } = query;

    // Query
    return this.ctx.model.Role.findAndCountAll({
      where: {
        ...assembleCondition({ name: { [Op.like]: `${name}%` } }, name),
      },
      ...computePage(page, size),
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
        where: { id: menuIds },
      });
      await role.setMenus(menus);
      data.menus = menus;
    }
    return data;
  }

  async update(body) {
    const { menuIds } = body;
    const { Role, Menu } = this.ctx.model;
    let role = await Role.findById(body.id);
    // 更新
    role = await role.update(body);
    const data = role.get({ plain: true });
    // 更新关系
    if (menuIds) {
      const menus = await Menu.findAll({
        where: { id: menuIds },
      });
      await role.setMenus(menus);
      data.menus = menus;
    }
    return data;
  }

  async destroy(id) {
    const result = await this.ctx.model.Role.destroy({ where: { id } });
    return { result };
  }
}

module.exports = RoleConnector;
