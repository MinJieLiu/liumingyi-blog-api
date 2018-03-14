module.exports = (appInfo) => {
  const config = {
    // App key
    keys: appInfo.name,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [
      'http://localhost:3000',
    ],
  };

  config.cors = {
    credentials: true,
  };

  config.middleware = [
    'errorHandler',
    'graphql',
  ];

  config.sequelize = {
    dialect: 'mysql',
    database: 'cutenav-blog',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
    timezone: '+08:00',
    define: {
      underscored: false, // 驼峰风格
    },
    paranoid: true, // 偏执模式
    operatorsAliases: false,
  };

  // 分页
  config.pages = {
    defaultSize: 10,
    defaultPage: 1,
  };

  return config;
};
