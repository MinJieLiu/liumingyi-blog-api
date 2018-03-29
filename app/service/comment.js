const egg = require('egg');
const DataLoader = require('dataloader');

const assembleCondition = require('../util/assemble_condition');
const computePage = require('../util/compute_page');

module.exports = class extends egg.Service {
  constructor(ctx) {
    super(ctx);

    this.showLoader = new DataLoader(id => this.show(id));
  }

  async show(idArr) {
    const list = await this.ctx.model.Comment.findAll({
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
      name,
      enable,
    } = query;

    return this.ctx.model.Comment.findAndCountAll({
      where: {
        ...assembleCondition({ name: { [Op.like]: `${name}%` } }, name),
        ...assembleCondition({ enable }, enable),
      },
      ...computePage(page, size),
      order: [
        ['sort', 'DESC'],
      ],
    });
  }

  async create(body) {
    const comment = await this.ctx.model.Comment.create(body);
    return comment.get({ plain: true });
  }

  async update(body) {
    const comment = await this.ctx.model.Comment.findById(body.id);
    // 更新
    if (!comment) {
      throw new Error('未找到该条数据');
    }
    const data = await comment.update(body);
    return data.get({ plain: true });
  }

  async destroy(id) {
    const result = await this.ctx.model.Comment.destroy({ where: { id } });
    return { result };
  }
};
