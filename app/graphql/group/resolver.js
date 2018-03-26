module.exports = {
  Query: {
    group(obj, args, ctx) {
      return ctx.connector.group.find(args.id);
    },
    groupList(obj, args, ctx) {
      return ctx.connector.group.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createGroup(obj, args, ctx) {
      return ctx.connector.group.create(args.input);
    },
    updateGroup(obj, args, ctx) {
      return ctx.connector.group.update(args.input);
    },
    deleteGroup(obj, args, ctx) {
      return ctx.connector.group.destroy(args.id);
    },
  },
};
