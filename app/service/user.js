const egg = require('egg');
const DataLoader = require('dataloader');
const crypto = require('crypto');

const assembleCondition = require('../util/assemble_condition');
const computePage = require('../util/compute_page');

module.exports = class extends egg.Service {
  constructor(ctx) {
    super(ctx);

    this.showLoader = new DataLoader(id => this.show(id));
  }

  async show(idArr) {
    const list = await this.ctx.model.User.findAll({
      where: {
        id: idArr,
      },
      raw: true,
    });
    return idArr.map(currentId => list.find(n => n.id === currentId));
  }

  find(id) {
    return this.showLoader.load(id);
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
      email,
      enable,
      mobile,
    } = query;

    return this.ctx.model.User.findAndCountAll({
      where: {
        ...assembleCondition({ email: { [Op.like]: `${email}%` } }, email),
        ...assembleCondition({ enable }, enable),
        ...assembleCondition({ mobile: { [Op.like]: `${mobile}%` } }, mobile),
      },
      ...computePage(page, size),
      order: [
        ['updatedAt', 'DESC'],
      ],
    });
  }

  async create(body) {
    const { roleIds, password } = body;
    // 加密
    Object.assign(body, {
      password: crypto.createHash('md5').update(password).digest('hex'),
    });
    const { User, Role } = this.ctx.model;
    const user = await User.create(body);
    // 建立关系
    const data = user.get({ plain: true });
    if (roleIds) {
      const roles = await Role.findAll({
        where: { id: roleIds },
      });
      await user.setRoles(roles);
      data.roles = roles;
    }
    return data;
  }

  /**
   * 通过授权的方式创建用户
   * @param provider
   * @param body
   */
  async createWithProvider({ provider, ...body }) {
    const data = await this.create(body);
    // 创建授权信息
    await this.ctx.model.Authorization.create({
      provider,
      userId: data.id,
    });
    return data;
  }

  async update(body) {
    const { id, roleIds } = body;
    const { User, Role } = this.ctx.model;
    let user = await User.findById(id);
    if (!user) {
      throw new Error('未找到该条数据');
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
        where: { id: roleIds },
      });
      await user.setRoles(roles);
      data.roles = roles;
    }
    return data;
  }

  async destroy(id) {
    const result = await this.ctx.model.User.destroy({ where: { id } });
    return { result };
  }

  /**
   * 通过 Id 获取用户的菜单
   * @param id
   * @return {Promise<Array>}
   */
  async userMenus(id) {
    const { User, Role, Menu } = this.ctx.model;
    return Menu.findAll({
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
      raw: true,
    });
  }
};
