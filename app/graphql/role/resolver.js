module.exports = {
  User: {
    roles(obj, args, ctx) {
      return ctx.connector.role.findByUserId(obj.id);
    },
  },
  Query: {
    role(obj, args, ctx) {
      return ctx.connector.role.find(args.id);
    },
    roleList(obj, args, ctx) {
      return ctx.connector.role.findAndCountAll(args);
    },
  },
  Mutation: {
    createRole(obj, args, ctx) {
      return ctx.connector.role.create(args.input);
    },
    updateRole(obj, args, ctx) {
      return ctx.connector.role.update(args.input);
    },
    deleteRole(obj, args, ctx) {
      return ctx.connector.role.destroy(args.id);
    },
  },
};
