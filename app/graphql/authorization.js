exports.resolver = {
  User: {
    authorizations(obj, args, ctx) {
      return ctx.service.authorization.findByUserId(obj.id);
    },
  },
  Query: {
    login(obj, args, ctx) {
      return ctx.service.authorization.login(args);
    },
    logout(obj, args, ctx) {
      return ctx.service.authorization.logout();
    },
  },
};
