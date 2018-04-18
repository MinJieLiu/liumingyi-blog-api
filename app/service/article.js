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
    const list = await this.ctx.model.Article.findAll({
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
      title,
      status,
    } = query;

    return this.ctx.model.Article.findAndCountAll({
      where: {
        ...assembleCondition({ title: { [Op.like]: `${title}%` } }, title),
        ...assembleCondition({ status }, status),
      },
      ...computePage(page, size),
      order: [
        ['sort', 'DESC'],
      ],
    });
  }

  async findByTag(query) {
    const {
      config: { pages: { defaultPage, defaultSize } },
    } = this.ctx.app;
    const {
      id,
      page = defaultPage,
      size = defaultSize,
    } = query;
    const { Tag, Article } = this.ctx.model;

    return Article.findAndCountAll({
      include: [{
        model: Tag,
        attributes: ['id'],
        where: { id },
        required: true,
      }],
      order: [
        ['sort', 'DESC'],
      ],
      ...computePage(page, size),
      raw: true,
    });
  }

  async create(body) {
    const article = await this.ctx.model.Article.create(body);
    return article.get({ plain: true });
  }

  async update(body) {
    const article = await this.ctx.model.Article.findById(body.id);
    // 更新
    if (!article) {
      throw new Error('未找到该条数据');
    }
    const data = await article.update(body);
    return data.get({ plain: true });
  }

  async destroy(id) {
    const result = await this.ctx.model.Article.destroy({ where: { id } });
    return { result };
  }
};
