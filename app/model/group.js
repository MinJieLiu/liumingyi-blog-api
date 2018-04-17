module.exports = (app) => {
  const { model } = app;
  const { STRING, INTEGER } = app.Sequelize;
  const Group = model.define('group', {

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

    enable: {
      type: INTEGER,
      defaultValue: 0,
      comment: '启用状态',
    },

    sort: {
      type: INTEGER,
      defaultValue: 1,
      comment: '排序',
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

  Group.associate = () => {
    model.Group.hasMany(model.Article);
  };

  return Group;
};
