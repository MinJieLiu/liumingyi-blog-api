module.exports = (app) => {
  app.beforeStart(() => app.model.sync({ force: false }));
};
