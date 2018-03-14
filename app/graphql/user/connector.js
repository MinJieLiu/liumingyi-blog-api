const DataLoader = require('dataloader');
const crypto = require('crypto');

const assemblyCondition = require('../../util/assembly_condition');
const computePage = require('../../util/compute_page');

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;

    this.loader = new DataLoader(id => this.show(id));

    this.listLoader = new DataLoader(args => this.findAndCountAll(args));
  }

  async show(idArr) {
    const list = await this.ctx.model.User.findAll({
      where: {
        id: idArr,
      },
    }).then(us => us.map(u => u.toJSON()));
    return idArr.map(currentId => list.find(n => String(n.id) === currentId));
  }

  /**
   * 分页查询
   * @param {Object} query - 参数
   * @return {Promise} - result
   */
  async findAndCountAll(query = {}) {
    const { defaultPage, defaultSize } = this.ctx.config.pages;
    const {
      page = defaultPage,
      size = defaultSize,
      email,
      enable,
      mobile,
    } = query;

    const { offset, limit } = computePage(page, size);

    // Query
    return this.ctx.model.User.findAndCountAll({
      where: Object.assign(
        {},
        assemblyCondition({ email: { $like: `${email}%` } }, email),
        assemblyCondition({ enable }, enable),
        assemblyCondition({ mobile: { $like: `${mobile}%` } }, mobile),
      ),
      offset,
      limit,
      order: [
        ['updatedAt', 'DESC'],
      ],
    }).then(us => us.map(u => u.toJSON()));
  }

  user(id) {
    return this.loader.load(id);
  }

  userList(args) {
    return this.listLoader.load(args);
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
        where: { id: { $in: roleIds } },
      });
      await user.setRoles(roles);
      data.roles = roles;
    }
    return data;
  }
}

module.exports = UserConnector;
