const egg = require('egg');

module.exports = class extends egg.Controller {
  async index(ctx) {
    ctx.body = { message: 'hello world' };
  }
};
