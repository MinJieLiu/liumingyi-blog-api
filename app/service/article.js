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
      userId,
      groupId,
      type,
      status,
      tagIds = [],
    } = query;

    const { Tag, Article } = this.ctx.model;
    return Article.findAndCountAll({
      where: {
        ...assembleCondition({ title: { [Op.like]: `${title}%` } }, title),
        ...assembleCondition({ userId }, userId),
        ...assembleCondition({ groupId }, groupId),
        ...assembleCondition({ type }, type),
        ...assembleCondition({ status }, status),
      },
      ...tagIds.length ? {
        include: [{
          model: Tag,
          attributes: [],
          where: { id: tagIds },
          required: true,
        }],
      } : undefined,
      ...computePage(page, size),
      order: [
        ['sort', 'DESC'],
      ],
    });
  }

  async create({ tagIds, ...body }) {
    const { Article, Tag } = this.ctx.model;
    const article = await Article.create({
      ...body,
      userId: this.ctx.user.id,
    });
    const data = article.get({ plain: true });
    // 建立关系
    if (tagIds) {
      const tags = await Tag.findAll({
        where: { id: tagIds },
      });
      await article.setTags(tags);
      data.tags = tags;
    }
    return data;
  }

  async update({ tagIds, ...body }) {
    return this.ctx.model.transaction(async (transaction) => {
      const { Article, Tag } = this.ctx.model;
      let article = await Article.findById(body.id);
      // 更新
      if (!article) {
        throw new Error('未找到该条数据');
      }
      // 更新
      article = await article.update(body, { transaction });
      const data = article.get({ plain: true });
      // 更新关系
      if (tagIds) {
        const tags = await Tag.findAll({
          where: { id: tagIds },
        });
        await article.setTags(tags, { transaction });
        data.tags = tags;
      }
      return data;
    });
  }

  async destroy(id) {
    const result = await this.ctx.model.Article.destroy({ where: { id } });
    return { result };
  }
};
