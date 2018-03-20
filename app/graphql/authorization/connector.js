const DataLoader = require('dataloader');
const crypto = require('crypto');

class AuthorizationConnector {
  constructor(ctx) {
    this.ctx = ctx;

    this.showByUserLoader = new DataLoader(id => this.showByUserId(id));
  }

  async showByUserId(idArr) {
    const list = await this.ctx.model.Authorization.findAll({
      where: {
        userId: idArr,
      },
      raw: true,
    });
    return idArr.map(currentId => list.filter(n => n.userId === currentId));
  }

  findByUserId(userId) {
    return this.showByUserLoader.load(userId);
  }

  async login(body) {
    const { username, password } = body;
    // 查找
    const data = await this.ctx.model.User.findOne({
      where: {
        username,
        password: crypto.createHash('md5').update(password).digest('hex'),
      },
      raw: true,
    });
    if (!data) {
      throw new Error('用户不存在或密码不正确');
    }
    // 为用户启动一个登录的 session
    this.ctx.login(data);
    return data;
  }

  async logout() {
    this.ctx.logout();
    return { result: true };
  }
}

module.exports = AuthorizationConnector;
