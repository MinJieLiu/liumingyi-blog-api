
/**
 * 组装存在的条件
 * @param {object} result - 组装结果
 * @param {string|number|boolean} condition - 条件
 * @return {object|undefined} - 存在的条件
 */
module.exports = (result, condition) => (condition !== undefined && condition !== '' ? result : undefined);
