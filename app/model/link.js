module.exports = (app) => {
  const { model } = app;
  const { STRING, INTEGER } = app.Sequelize;
  return model.define('link', {

    url: {
      type: STRING(255),
      allowNull: false,
      comment: '链接',
    },

    name: {
      type: STRING(255),
      allowNull: false,
      comment: '名称',
    },

    image: {
      type: STRING(255),
      comment: '图片',
    },

    target: {
      type: STRING(25),
      comment: '目标',
    },

    description: {
      type: STRING(255),
      comment: '简介',
    },

    visible: {
      type: INTEGER,
      defaultValue: 0,
      comment: '可见',
    },

    sort: {
      type: INTEGER,
      defaultValue: 0,
      comment: '排序',
    },

  }, {
    tableName: 'cms_links',
    comment: '链接表',
    indexes: [
      { fields: ['url', 'visible'] },
    ],
  });
};
