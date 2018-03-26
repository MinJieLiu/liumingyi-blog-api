module.exports = {
  Query: {
    link(obj, args, ctx) {
      return ctx.connector.link.find(args.id);
    },
    linkList(obj, args, ctx) {
      return ctx.connector.link.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createLink(obj, args, ctx) {
      return ctx.connector.link.create(args.input);
    },
    updateLink(obj, args, ctx) {
      return ctx.connector.link.update(args.input);
    },
    deleteLink(obj, args, ctx) {
      return ctx.connector.link.destroy(args.id);
    },
  },
};
