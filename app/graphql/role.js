exports.resolver = {
  Query: {
    role(obj, args, ctx) {
      return ctx.service.role.find(args.id);
    },
    roleList(obj, args, ctx) {
      return ctx.service.role.findAndCountAll(args);
    },
  },
  Mutation: {
    createRole(obj, args, ctx) {
      return ctx.service.role.create(args.input);
    },
    updateRole(obj, args, ctx) {
      return ctx.service.role.update(args.input);
    },
    deleteRole(obj, args, ctx) {
      return ctx.service.role.destroy(args.id);
    },
  },
};
