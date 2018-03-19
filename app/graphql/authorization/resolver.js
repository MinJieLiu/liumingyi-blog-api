module.exports = {
  User: {
    authorizations(obj, args, ctx) {
      return ctx.connector.authorization.findByUserId(obj.id);
    },
  },
  Query: {
    login(obj, args, ctx) {
      return ctx.connector.authorization.login(args);
    },
    logout(obj, args, ctx) {
      return ctx.connector.authorization.logout();
    },
  },
};
