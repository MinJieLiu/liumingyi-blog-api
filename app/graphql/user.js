exports.resolver = {
  User: {
    roles(obj, args, ctx) {
      return ctx.service.role.findByUserId(obj.id);
    },
    menus(obj, args, ctx) {
      return ctx.service.menu.findByUserId(obj.id);
    },
  },
  Query: {
    profile(obj, args, ctx) {
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
