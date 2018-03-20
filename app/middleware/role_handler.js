
module.exports = () => async (ctx, next) => {
  console.log(ctx);
  await next();
};
