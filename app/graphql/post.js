exports.resolver = {
  Query: {
    post(obj, args, ctx) {
      return ctx.service.post.find(args.id);
    },
    postList(obj, args, ctx) {
      return ctx.service.post.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createPost(obj, args, ctx) {
      return ctx.service.post.create(args.input);
    },
    updatePost(obj, args, ctx) {
      return ctx.service.post.update(args.input);
    },
    deletePost(obj, args, ctx) {
      return ctx.service.post.destroy(args.id);
    },
  },
};
