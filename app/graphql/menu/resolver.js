module.exports = {
  Role: {
    menus(obj, args, ctx) {
      return ctx.connector.menu.findByRoleId(obj.id);
    },
  },
  Query: {
    menu(obj, args, ctx) {
      return ctx.connector.menu.find(args.id);
    },
    menuList(obj, args, ctx) {
      return ctx.connector.menu.findAndCountAll(args);
    },
  },
  Mutation: {
    createMenu(obj, args, ctx) {
      return ctx.connector.menu.create(args.input);
    },
    updateMenu(obj, args, ctx) {
      return ctx.connector.menu.update(args.input);
    },
    deleteMenu(obj, args, ctx) {
      return ctx.connector.menu.destroy(args.id);
    },
  },
};
