const DataLoader = require('dataloader');

const assembleCondition = require('../../util/assemble_condition');

class LinkConnector {
  constructor(ctx) {
    this.ctx = ctx;

    this.showLoader = new DataLoader(id => this.show(id));
  }

  async show(idArr) {
    const list = await this.ctx.model.Link.findAll({
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
      Sequelize: { Op },
    } = this.ctx.app;
    const {
      name,
      enable,
    } = query;

    return this.ctx.model.Link.findAndCountAll({
      where: {
        ...assembleCondition({ name: { [Op.like]: `${name}%` } }, name),
        ...assembleCondition({ enable }, enable),
      },
      order: [
        ['sort', 'DESC'],
      ],
    });
  }

  async create(body) {
    const link = await this.ctx.model.Link.create(body);
    return link.get({ plain: true });
  }

  async update(body) {
    const link = await this.ctx.model.Link.findById(body.id);
    // 更新
    if (!link) {
      throw new Error('未找到该条数据');
    }
    const data = await link.update(body);
    return data.get({ plain: true });
  }

  async destroy(id) {
    const result = await this.ctx.model.Link.destroy({ where: { id } });
    return { result };
  }
}

module.exports = LinkConnector;
