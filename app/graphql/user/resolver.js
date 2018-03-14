module.exports = {
  Query: {
    user(obj, args, ctx) {
      return ctx.connector.user.user(args.id);
    },
    userList(obj, args, ctx) {
      return ctx.connector.user.userList(args);
    },
  },
  Mutation: {
    createUser(obj, args, ctx) {
      return ctx.connector.user.create(args);
    },
  },
};
