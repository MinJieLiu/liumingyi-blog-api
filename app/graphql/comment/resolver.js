module.exports = {
  Query: {
    comment(obj, args, ctx) {
      return ctx.connector.comment.find(args.id);
    },
    commentList(obj, args, ctx) {
      return ctx.connector.comment.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createComment(obj, args, ctx) {
      return ctx.connector.comment.create(args.input);
    },
    updateComment(obj, args, ctx) {
      return ctx.connector.comment.update(args.input);
    },
    deleteComment(obj, args, ctx) {
      return ctx.connector.comment.destroy(args.id);
    },
  },
};
