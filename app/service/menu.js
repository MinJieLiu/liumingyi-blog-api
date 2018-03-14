const egg = require('egg');

module.exports = class extends egg.Service {
  /**
   * 列表查询
   * @return {Promise} - result
   */
  async findAll() {
    // Query
    return this.ctx.model.Menu.findAll({
      order: [
        ['sort', 'ASC'],
      ],
    });
  }
};
