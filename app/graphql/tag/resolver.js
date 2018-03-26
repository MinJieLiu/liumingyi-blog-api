module.exports = {
  Query: {
    tag(obj, args, ctx) {
      return ctx.connector.tag.find(args.id);
    },
    tagList(obj, args, ctx) {
      return ctx.connector.tag.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createTag(obj, args, ctx) {
      return ctx.connector.tag.create(args.input);
    },
    updateTag(obj, args, ctx) {
      return ctx.connector.tag.update(args.input);
    },
    deleteTag(obj, args, ctx) {
      return ctx.connector.tag.destroy(args.id);
    },
  },
};
