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
    const { defaultPage, defaultSize } = this.config.pages;
    const {
      page = defaultPage,
      size = defaultSize,
      status,
      method,
      url,
      ip,
      createdAtStart,
      createdAtEnd,
    } = query;

    const { offset, limit } = computePage(page, size);

    // Query
    return this.ctx.model.Log.findAndCountAll({
      where: Object.assign(
        {},
        assembleCondition({ status: { $like: `${status}%` } }, status),
        assembleCondition({ method }, method),
        assembleCondition({ url: { $like: `${url}%` } }, url),
        assembleCondition({ ip: { $like: `${ip}%` } }, ip),
        assembleCondition({
          createdAt: Object.assign(
            {},
            assembleCondition({ $gte: new Date(createdAtStart) }, createdAtStart),
            assembleCondition({ $lt: new Date(createdAtEnd) }, createdAtEnd),
          ),
        }, !!(createdAtStart || createdAtEnd)),
      ),
      offset,
      limit,
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  }
};
