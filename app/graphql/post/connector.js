const DataLoader = require('dataloader');

const assembleCondition = require('../../util/assemble_condition');
const computePage = require('../../util/compute_page');

class PostConnector {
  constructor(ctx) {
    this.ctx = ctx;

    this.showLoader = new DataLoader(id => this.show(id));
  }

  async show(idArr) {
    const list = await this.ctx.model.Post.findAll({
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

    return this.ctx.model.Post.findAndCountAll({
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

  async create(body) {
    const post = await this.ctx.model.Post.create(body);
    return post.get({ plain: true });
  }

  async update(body) {
    const post = await this.ctx.model.Post.findById(body.id);
    // 更新
    if (!post) {
      throw new Error('未找到该条数据');
    }
    const data = await post.update(body);
    return data.get({ plain: true });
  }

  async destroy(id) {
    const result = await this.ctx.model.Post.destroy({ where: { id } });
    return { result };
  }
}

module.exports = PostConnector;
