
module.exports = (app) => {
  const { model } = app;
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  return model.define('log', {

    status: {
      type: INTEGER,
      defaultValue: 200,
      comment: '状态码',
    },

    title: {
      type: STRING(255),
      comment: '标题',
    },

    ip: {
      type: STRING(128),
      comment: 'IP地址',
    },

    url: {
      type: STRING(255),
      comment: 'URL',
    },

    method: {
      type: STRING(10),
      comment: '操作方式',
    },

    message: {
      type: TEXT,
      comment: '描述',
    },
  }, {
    tableName: 'sys_logs',
    comment: '日志表',
    indexes: [
      { fields: ['status', 'ip', 'method'] },
    ],
  });
};
