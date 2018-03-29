exports.resolver = {
  Query: {
    group(obj, args, ctx) {
      return ctx.service.group.find(args.id);
    },
    groupList(obj, args, ctx) {
      return ctx.service.group.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createGroup(obj, args, ctx) {
      return ctx.service.group.create(args.input);
    },
    updateGroup(obj, args, ctx) {
      return ctx.service.group.update(args.input);
    },
    deleteGroup(obj, args, ctx) {
      return ctx.service.group.destroy(args.id);
    },
  },
};
