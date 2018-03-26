module.exports = (app) => {
  const { model } = app;
  const { STRING, INTEGER } = app.Sequelize;
  const Tag = model.define('tag', {

    name: {
      type: STRING(255),
      allowNull: false,
      comment: '名称',
    },

    sort: {
      type: INTEGER,
      defaultValue: 0,
      comment: '排序',
    },

  }, {
    tableName: 'cms_tags',
    comment: '标签表',
    indexes: [
      { fields: ['name'] },
    ],
  });

  Tag.associate = () => {
    model.Tag.belongsToMany(model.Post, {
      through: 'cms_post_tags',
    });
  };

  return Tag;
};
