module.exports = (app) => {
  const { router, controller } = app;
  // home
  router.get('/', controller.home.index);

  // github 鉴权
  app.passport.mount('github');
};
