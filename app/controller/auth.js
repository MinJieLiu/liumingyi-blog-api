const egg = require('egg');

module.exports = class extends egg.Controller {
  /**
   * 登录
   * @param {Object} ctx - context
   * @body {Object} body
   *  - email
   *  - password
   */
  async login(ctx) {
    ctx.body = await ctx.service.auth.login(ctx.request.body);
  }

  // 验证码
  async captcha(ctx) {
    ctx.body = '';
  }
};
