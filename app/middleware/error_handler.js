
module.exports = (options, app) => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const status = err.status || 500;
    if (status >= 500) {
      // 记录一条错误日志
      app.emit('error', err);
    }
    // 生产环境时 500 错误不返回内容
    const error = status === 500 && app.config.env === 'prod'
      ? 'Internal Server Error'
      : err.message;
    // 设置响应错误信息
    ctx.body = { error };
    if (status === 422) {
      ctx.body.detail = err.errors;
    }
    ctx.status = status;
  }
};
