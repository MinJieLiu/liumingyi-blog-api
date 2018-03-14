
/**
 * 通过参数转换为 limit 和 offset
 * @param {number} page - 当前第几页
 * @param {number} size - 每页数量
 * @return {object} limit 和 offset
 */
module.exports = (page, size) => ({
  offset: Number(size) * (Number(page) - 1),
  limit: Number(size),
});
