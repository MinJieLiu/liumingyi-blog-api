exports.resolver = {
  Query: {
    comment(obj, args, ctx) {
      return ctx.service.comment.find(args.id);
    },
    commentList(obj, args, ctx) {
      return ctx.service.comment.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createComment(obj, args, ctx) {
      return ctx.service.comment.create(args.input);
    },
    updateComment(obj, args, ctx) {
      return ctx.service.comment.update(args.input);
    },
    deleteComment(obj, args, ctx) {
      return ctx.service.comment.destroy(args.id);
    },
  },
};
