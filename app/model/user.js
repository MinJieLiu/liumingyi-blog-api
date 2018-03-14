
module.exports = (app) => {
  const { model } = app;
  const { STRING, INTEGER } = app.Sequelize;
  const User = model.define('user', {

    email: {
      type: STRING(100),
      unique: true,
      validate: { isEmail: true },
      comment: '邮箱',
    },

    password: {
      type: STRING(100),
      allowNull: false,
      comment: '密码',
    },

    enable: {
      type: INTEGER,
      defaultValue: 0,
      comment: '启用状态',
    },

    isActive: {
      type: INTEGER,
      defaultValue: 0,
      comment: '激活状态',
    },

    activeKey: {
      type: STRING(64),
      comment: '激活密钥',
    },

    nickname: {
      type: STRING(20),
      comment: '昵称',
    },

    avatar: {
      type: STRING(255),
      comment: '头像',
    },

    mobile: {
      type: STRING(20),
      comment: '手机',
    },

    introduction: {
      type: STRING(255),
      comment: '介绍',
    },
  }, {
    tableName: 'sys_users',
    comment: '用户表',
    indexes: [
      { fields: ['email', 'password', 'enable', 'isActive', 'mobile'] },
    ],
  });

  User.associate = () => {
    model.User.belongsToMany(model.Role, {
      through: 'sys_user_roles',
    });
  };

  return User;
};
