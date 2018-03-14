
/**
 * 组装存在的条件
 * @param {object} condition - 条件
 * @param {string|number|boolean} value - 值
 * @return {object|undefined} - 存在的条件
 */
module.exports = (condition, value) => (value !== undefined && value !== '' ? condition : undefined);
