module.exports = (app) => {
  const { model } = app;
  const { STRING } = app.Sequelize;
  return model.define('setting', {

    name: {
      type: STRING(200),
      allowNull: false,
      comment: '名称',
    },

    value: {
      type: STRING(255),
      allowNull: false,
      comment: '值',
    },
  }, {
    tableName: 'sys_settings',
    comment: '选项表',
    indexes: [
      { fields: ['name'] },
    ],
  });
};
