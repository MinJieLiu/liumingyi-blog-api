
/**
 * 组装存在的条件
 * @param {object} result - 组装结果
 * @param {string|number|boolean|Array} condition - 条件
 * @return {object|undefined} - 存在的条件
 */
module.exports = (result, condition) => {
  if (Array.isArray(condition)) {
    return condition.length ? result : undefined;
  }
  return (condition !== undefined && condition !== '' ? result : undefined);
};
