module.exports = {
  Query: {
    user(obj, args, ctx) {
      return ctx.connector.user.user(args.id);
    },
    userList(obj, args, ctx) {
      return ctx.connector.user.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createUser(obj, args, ctx) {
      return ctx.connector.user.create(args.input);
    },
    updateUser(obj, args, ctx) {
      return ctx.connector.user.update(args.input);
    },
    deleteUser(obj, args, ctx) {
      return ctx.connector.user.destroy(args.id);
    },
  },
};
