const DataLoader = require('dataloader');

const assembleCondition = require('../../util/assemble_condition');

class SettingConnector {
  constructor(ctx) {
    this.ctx = ctx;

    this.showLoader = new DataLoader(id => this.show(id));
  }

  async show(idArr) {
    const list = await this.ctx.model.Setting.findAll({
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

    return this.ctx.model.Setting.findAndCountAll({
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
    const setting = await this.ctx.model.Setting.create(body);
    return setting.get({ plain: true });
  }

  async update(body) {
    const setting = await this.ctx.model.Setting.findById(body.id);
    // 更新
    if (!setting) {
      throw new Error('未找到该条数据');
    }
    const data = await setting.update(body);
    return data.get({ plain: true });
  }

  async destroy(id) {
    const result = await this.ctx.model.Setting.destroy({ where: { id } });
    return { result };
  }
}

module.exports = SettingConnector;
