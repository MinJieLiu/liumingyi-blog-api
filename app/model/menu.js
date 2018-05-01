
module.exports = (app) => {
  const { model } = app;
  const { STRING, INTEGER } = app.Sequelize;
  const Menu = model.define('menu', {

    parentId: {
      type: INTEGER,
      allowNull: false,
      comment: '上级 Id',
    },

    name: {
      type: STRING(50),
      allowNull: false,
      comment: '名称',
    },

    type: {
      type: STRING(20),
      defaultValue: 1,
      comment: '类型',
    },

    enable: {
      type: INTEGER,
      defaultValue: 1,
      comment: '启用',
    },

    permission: {
      type: STRING(50),
      unique: true,
      comment: '标识',
    },

    icon: {
      type: STRING(50),
      comment: '图标',
    },

    pathname: {
      type: STRING(255),
      comment: '路径',
    },

    sort: {
      type: INTEGER,
      defaultValue: 1,
      comment: '排序',
    },

  }, {
    tableName: 'sys_menus',
    comment: '菜单表',
  });

  Menu.associate = () => {
    model.Menu.belongsToMany(model.Role, {
      through: 'sys_role_menus',
    });
  };

  return Menu;
};
