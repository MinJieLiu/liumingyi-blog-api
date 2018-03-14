const egg = require('egg');

const assemblyCondition = require('../util/assembly_condition');
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
        assemblyCondition({ status: { $like: `${status}%` } }, status),
        assemblyCondition({ method }, method),
        assemblyCondition({ url: { $like: `${url}%` } }, url),
        assemblyCondition({ ip: { $like: `${ip}%` } }, ip),
        assemblyCondition({
          createdAt: Object.assign(
            {},
            assemblyCondition({ $gte: new Date(createdAtStart) }, createdAtStart),
            assemblyCondition({ $lt: new Date(createdAtEnd) }, createdAtEnd),
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
