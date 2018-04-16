const egg = require('egg');

const assembleCondition = require('../util/assemble_condition');
const computePage = require('../util/compute_page');

module.exports = class extends egg.Service {
  /**
   * 分页查询
   * @param {Object} query - 参数
   * @return {Promise} - result
   */
  async findAndCountAll(query = {}) {
    const {
      Sequelize: { Op },
    } = this.ctx.app;
    const { defaultPage, defaultSize } = this.config.pages;
    const {
      page = defaultPage,
      size = defaultSize,
      status,
      method,
      url,
      ip,
    } = query;

    const { offset, limit } = computePage(page, size);

    // Query
    return this.ctx.model.Log.findAndCountAll({
      where: Object.assign(
        {},
        assembleCondition({ status: { [Op.like]: `${status}%` } }, status),
        assembleCondition({ method }, method),
        assembleCondition({ url: { [Op.like]: `${url}%` } }, url),
        assembleCondition({ ip: { [Op.like]: `${ip}%` } }, ip),
      ),
      offset,
      limit,
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  }
};
