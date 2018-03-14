module.exports = ({ router, controller }) => {
  // home
  router.get('/', controller.home.index);

  // 登录
  router.post('/login', controller.auth.login);
  // 验证码
  router.post('/captcha', controller.auth.captcha);
};
