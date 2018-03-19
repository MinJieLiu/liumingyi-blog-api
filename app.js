module.exports = (app) => {
  // 同步
  app.beforeStart(() => app.model.sync({ force: false }));

  // passport
  app.passport.verify(async (ctx, user) => {
    // 查找授权信息
    const auth = await ctx.model.Authorization.findOne({
      where: {
        id: user.id,
        provider: user.provider,
      },
      raw: true,
    });
    if (auth) {
      // 查找用户信息
      const existsUser = await ctx.model.User.findOne({ id: auth.userId });
      if (existsUser) {
        return existsUser;
      }
    }

    // 注册新用户
    return ctx.connector.user.createWithProvider(user);
  });

  // 序列化用户信息
  app.passport.serializeUser(async (ctx, user) => ({ id: user.id }));

  // 反序列化用户信息
  app.passport.deserializeUser(async (ctx, user) => ctx.connector.user.find(user.id));
};
