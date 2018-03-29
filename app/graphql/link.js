exports.resolver = {
  Query: {
    link(obj, args, ctx) {
      return ctx.service.link.find(args.id);
    },
    linkList(obj, args, ctx) {
      return ctx.service.link.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createLink(obj, args, ctx) {
      return ctx.service.link.create(args.input);
    },
    updateLink(obj, args, ctx) {
      return ctx.service.link.update(args.input);
    },
    deleteLink(obj, args, ctx) {
      return ctx.service.link.destroy(args.id);
    },
  },
};
