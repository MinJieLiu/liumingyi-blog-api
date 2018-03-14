const egg = require('egg');
const crypto = require('crypto');

module.exports = class extends egg.Service {
  async login(body) {
    const { email, password } = body;
    const { User } = this.ctx.model;

    // Query
    const user = await User.findOne({
      attributes: { exclude: ['password', 'activeKey'] },
      where: {
        email,
        password: crypto.createHash('md5').update(password).digest('hex'),
      },
    });
    // Result
    if (user) {
      const data = user.get({ plain: true });
      data.roles = await user.getRoles();
      return {
        result: true,
        data,
      };
    }
    return {
      result: false,
      message: '用户不存在或密码不正确',
    };
  }
};
