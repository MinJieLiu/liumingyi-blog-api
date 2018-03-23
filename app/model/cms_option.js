module.exports = (app) => {
  const { model } = app;
  const { STRING, TEXT } = app.Sequelize;
  return model.define('CmsOption', {

    name: {
      type: STRING(200),
      allowNull: false,
      comment: '名称',
    },

    value: {
      type: TEXT,
      allowNull: false,
      comment: '值',
    },

  }, {
    tableName: 'cms_options',
    comment: '选项表',
    indexes: [
      { fields: ['name'] },
    ],
  });
};
