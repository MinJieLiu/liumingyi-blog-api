exports.resolver = {
  Query: {
    user(obj, args, ctx) {
      // 无参数时查询当前登录的用户
      if (!(args.id || ctx.user)) {
        throw new Error('缺少参数 Id');
      }
      return ctx.service.user.find(args.id || ctx.user.id);
    },
    userList(obj, args, ctx) {
      return ctx.service.user.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createUser(obj, args, ctx) {
      return ctx.service.user.create(args.input);
    },
    updateUser(obj, args, ctx) {
      return ctx.service.user.update(args.input);
    },
    deleteUser(obj, args, ctx) {
      return ctx.service.user.destroy(args.id);
    },
  },
};
