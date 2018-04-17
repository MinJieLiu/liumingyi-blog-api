exports.resolver = {
  Query: {
    article(obj, args, ctx) {
      return ctx.service.article.find(args.id);
    },
    articleList(obj, args, ctx) {
      return ctx.service.article.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createArticle(obj, args, ctx) {
      return ctx.service.article.create(args.input);
    },
    updateArticle(obj, args, ctx) {
      return ctx.service.article.update(args.input);
    },
    deleteArticle(obj, args, ctx) {
      return ctx.service.article.destroy(args.id);
    },
  },
};
