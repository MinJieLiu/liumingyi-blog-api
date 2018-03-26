module.exports = (app) => {
  const { model } = app;
  const { STRING, INTEGER } = app.Sequelize;
  const CmsTag = model.define('cmsTag', {

    name: {
      type: STRING(255),
      allowNull: false,
      comment: '名称',
    },

    group: {
      type: INTEGER,
      defaultValue: 0,
      comment: '分组',
    },

  }, {
    tableName: 'cms_tags',
    comment: '标签表',
    indexes: [
      { fields: ['name'] },
    ],
  });

  CmsTag.associate = () => {
    model.CmsTag.belongsToMany(model.CmsPost, {
      through: 'cms_post_tags',
    });
  };

  return CmsTag;
};
