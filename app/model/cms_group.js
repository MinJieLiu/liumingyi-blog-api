module.exports = (app) => {
  const { model } = app;
  const { STRING, INTEGER } = app.Sequelize;
  const CmsGroup = model.define('CmsGroup', {

    parentId: {
      type: INTEGER,
      allowNull: false,
      comment: '上级 Id',
    },

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

    description: {
      type: STRING(255),
      comment: '描述',
    },

  }, {
    tableName: 'cms_groups',
    comment: '分组表',
    indexes: [
      { fields: ['parentId'] },
    ],
  });

  CmsGroup.associate = () => {
    model.CmsGroup.hasMany(model.CmsPost);
  };

  return CmsGroup;
};
