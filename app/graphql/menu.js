exports.resolver = {
  Role: {
    menus(obj, args, ctx) {
      return ctx.service.menu.findByRoleId(obj.id);
    },
  },
  Query: {
    menu(obj, args, ctx) {
      return ctx.service.menu.find(args.id);
    },
    menuList(obj, args, ctx) {
      return ctx.service.menu.findAndCountAll(args);
    },
  },
  Mutation: {
    createMenu(obj, args, ctx) {
      return ctx.service.menu.create(args.input);
    },
    updateMenu(obj, args, ctx) {
      return ctx.service.menu.update(args.input);
    },
    deleteMenu(obj, args, ctx) {
      return ctx.service.menu.destroy(args.id);
    },
  },
};
