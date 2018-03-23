module.exports = (app) => {
  const { model } = app;
  const { STRING, INTEGER } = app.Sequelize;
  return model.define('authorization', {

    provider: {
      type: STRING(32),
      allowNull: false,
      comment: '提供者',
    },

    userId: {
      type: INTEGER,
      allowNull: false,
      comment: '用户 Id',
    },

  }, {
    tableName: 'sys_authorizations',
    comment: '授权表',
    indexes: [
      { fields: ['userId'] },
    ],
  });
};
