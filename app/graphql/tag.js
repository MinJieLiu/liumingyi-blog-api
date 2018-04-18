exports.resolver = {
  Query: {
    tag(obj, args, ctx) {
      return ctx.service.tag.find(args.id);
    },
    tagList(obj, args, ctx) {
      return ctx.service.tag.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createTag(obj, args, ctx) {
      return ctx.service.tag.create(args.input);
    },
    updateTag(obj, args, ctx) {
      return ctx.service.tag.update(args.input);
    },
    deleteTag(obj, args, ctx) {
      return ctx.service.tag.destroy(args.id);
    },
  },
};
