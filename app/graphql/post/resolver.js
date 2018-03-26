module.exports = {
  Query: {
    post(obj, args, ctx) {
      return ctx.connector.post.find(args.id);
    },
    postList(obj, args, ctx) {
      return ctx.connector.post.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createPost(obj, args, ctx) {
      return ctx.connector.post.create(args.input);
    },
    updatePost(obj, args, ctx) {
      return ctx.connector.post.update(args.input);
    },
    deletePost(obj, args, ctx) {
      return ctx.connector.post.destroy(args.id);
    },
  },
};
