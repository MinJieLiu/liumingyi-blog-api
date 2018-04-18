exports.resolver = {
  Article: {
    user(obj, args, ctx) {
      return ctx.service.user.find(obj.userId);
    },
    group(obj, args, ctx) {
      return ctx.service.group.find(obj.groupId);
    },
    comments(obj, args, ctx) {
      return ctx.service.comment.findByArticleId(obj.id);
    },
    tags(obj, args, ctx) {
      return ctx.service.tag.findByArticleId(obj.id);
    },
  },
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
