const egg = require('egg');
const DataLoader = require('dataloader');

const assembleCondition = require('../util/assemble_condition');

module.exports = class extends egg.Service {
  constructor(ctx) {
    super(ctx);

    this.showLoader = new DataLoader(id => this.show(id));

    this.showByRoleLoader = new DataLoader(id => this.showByRoleId(id));
    this.showByUserLoader = new DataLoader(id => this.showByUserId(id));
  }

  async show(idArr) {
    const list = await this.ctx.model.Menu.findAll({
      where: {
        id: idArr,
      },
      raw: true,
    });
    return idArr.map(currentId => list.find(n => n.id === currentId));
  }

  async showByRoleId(roleIdArr) {
    const { Role, Menu } = this.ctx.model;
    const list = await Menu.findAll({
      include: [{
        model: Role,
        attributes: ['id'],
        where: { id: roleIdArr },
        required: true,
      }],
      raw: true,
    });
    return roleIdArr.map(currentId => list.filter(n => n['roles.id'] === currentId));
  }

  async showByUserId(userIdArr) {
    const { User, Role, Menu } = this.ctx.model;
    const list = Menu.findAll({
      include: [{
        model: Role,
        attributes: ['id'],
        required: true,
        include: [{
          model: User,
          attributes: ['id'],
          where: { id: userIdArr },
          required: true,
        }],
      }],
      raw: true,
    });
    return userIdArr.map(currentId => list.filter(n => n['roles.users.id'] === currentId));
  }

  find(id) {
    return this.showLoader.load(id);
  }

  findByRoleId(roleId) {
    return this.showByRoleLoader.load(roleId);
  }

  findByUserId(userId) {
    return this.showByUserLoader.load(userId);
  }

  /**
   * 分页查询
   * @param {Object} query - 参数
   * @return {Promise} - result
   */
  async findAndCountAll(query = {}) {
    const {
      Sequelize: { Op },
    } = this.ctx.app;
    const {
      name,
    } = query;

    // Query
    return this.ctx.model.Menu.findAndCountAll({
      where: {
        ...assembleCondition({ name: { [Op.like]: `${name}%` } }, name),
      },
      order: [
        ['sort', 'ASC'],
      ],
    });
  }

  async create(body) {
    const menu = await this.ctx.model.Menu.create(body);
    return menu.get({ plain: true });
  }

  async update(body) {
    const menu = await this.ctx.model.Menu.findById(body.id);
    // 更新
    if (!menu) {
      throw new Error('未找到该条数据');
    }
    const data = await menu.update(body);
    return data.get({ plain: true });
  }

  async destroy(id) {
    const result = await this.ctx.model.Menu.destroy({ where: { id } });
    return { result };
  }
};
