exports.resolver = {
  User: {
    roles(obj, args, ctx) {
      return ctx.service.role.findByUserId(obj.id);
    },
  },
  Query: {
    profile(obj, args, ctx) {
      if (!ctx.user) {
        throw new Error('not authorized');
      }
      return ctx.service.user.find(ctx.user.id);
    },
    user(obj, args, ctx) {
      return ctx.service.user.find(args.id);
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
