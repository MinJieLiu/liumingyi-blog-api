module.exports = {
  Query: {
    option(obj, args, ctx) {
      return ctx.connector.option.find(args.id);
    },
    optionList(obj, args, ctx) {
      return ctx.connector.option.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createOption(obj, args, ctx) {
      return ctx.connector.option.create(args.input);
    },
    updateOption(obj, args, ctx) {
      return ctx.connector.option.update(args.input);
    },
    deleteOption(obj, args, ctx) {
      return ctx.connector.option.destroy(args.id);
    },
  },
};
