const egg = require('egg');
const DataLoader = require('dataloader');

const assembleCondition = require('../util/assemble_condition');

module.exports = class extends egg.Service {
  constructor(ctx) {
    super(ctx);

    this.showLoader = new DataLoader(id => this.show(id));

    this.showByArticleLoader = new DataLoader(id => this.showByArticleId(id));
  }

  async show(idArr) {
    const list = await this.ctx.model.Tag.findAll({
      where: {
        id: idArr,
      },
      raw: true,
    });
    return idArr.map(currentId => list.find(n => n.id === currentId));
  }

  async showByArticleId(articleIdArr) {
    const { Article, Tag } = this.ctx.model;
    const list = await Tag.findAll({
      include: [{
        model: Article,
        attributes: ['id'],
        where: { id: articleIdArr },
        required: true,
      }],
      order: [
        ['sort', 'DESC'],
      ],
      raw: true,
    });
    return articleIdArr.map(currentId => list.filter(n => n['articles.id'] === currentId));
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

    return this.ctx.model.Tag.findAndCountAll({
      where: {
        ...assembleCondition({ name: { [Op.like]: `${name}%` } }, name),
        ...assembleCondition({ enable }, enable),
      },
      order: [
        ['sort', 'DESC'],
      ],
    });
  }

  findByArticleId(articleId) {
    return this.showByArticleLoader.load(articleId);
  }

  async create(body) {
    const tag = await this.ctx.model.Tag.create(body);
    return tag.get({ plain: true });
  }

  async update(body) {
    const tag = await this.ctx.model.Tag.findById(body.id);
    // 更新
    if (!tag) {
      throw new Error('未找到该条数据');
    }
    const data = await tag.update(body);
    return data.get({ plain: true });
  }

  async destroy(id) {
    const result = await this.ctx.model.Tag.destroy({ where: { id } });
    return { result };
  }
};
