module.exports = {
  Query: {
    setting(obj, args, ctx) {
      return ctx.connector.setting.find(args.id);
    },
    settingList(obj, args, ctx) {
      return ctx.connector.setting.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createSetting(obj, args, ctx) {
      return ctx.connector.setting.create(args.input);
    },
    updateSetting(obj, args, ctx) {
      return ctx.connector.setting.update(args.input);
    },
    deleteSetting(obj, args, ctx) {
      return ctx.connector.setting.destroy(args.id);
    },
  },
};
