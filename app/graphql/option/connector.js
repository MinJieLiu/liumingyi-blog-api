const DataLoader = require('dataloader');

const assembleCondition = require('../../util/assemble_condition');

class OptionConnector {
  constructor(ctx) {
    this.ctx = ctx;

    this.showLoader = new DataLoader(id => this.show(id));
  }

  async show(idArr) {
    const list = await this.ctx.model.Option.findAll({
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

    return this.ctx.model.Option.findAndCountAll({
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
    const option = await this.ctx.model.Option.create(body);
    return option.get({ plain: true });
  }

  async update(body) {
    const option = await this.ctx.model.Option.findById(body.id);
    // 更新
    if (!option) {
      throw new Error('未找到该条数据');
    }
    const data = await option.update(body);
    return data.get({ plain: true });
  }

  async destroy(id) {
    const result = await this.ctx.model.Option.destroy({ where: { id } });
    return { result };
  }
}

module.exports = OptionConnector;
