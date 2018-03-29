exports.resolver = {
  Query: {
    setting(obj, args, ctx) {
      return ctx.service.setting.find(args.id);
    },
    settingList(obj, args, ctx) {
      return ctx.service.setting.findAndCountAll(args.input);
    },
  },
  Mutation: {
    createSetting(obj, args, ctx) {
      return ctx.service.setting.create(args.input);
    },
    updateSetting(obj, args, ctx) {
      return ctx.service.setting.update(args.input);
    },
    deleteSetting(obj, args, ctx) {
      return ctx.service.setting.destroy(args.id);
    },
  },
};
