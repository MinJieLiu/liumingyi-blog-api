
module.exports = (app) => {
  const { model } = app;
  const { STRING, INTEGER } = app.Sequelize;
  const Role = model.define('role', {

    name: {
      type: STRING(50),
      unique: true,
      allowNull: false,
      comment: '名称',
    },

    sort: {
      type: INTEGER,
      comment: '排序',
    },

    remarks: {
      type: STRING(255),
      comment: '备注',
    },

  }, {
    tableName: 'sys_roles',
    comment: '角色表',
  });

  Role.associate = () => {
    model.Role.belongsToMany(model.User, {
      through: 'sys_user_roles',
    });
    model.Role.belongsToMany(model.Menu, {
      through: 'sys_role_menus',
    });
  };

  return Role;
};
