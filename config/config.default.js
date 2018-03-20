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
    'roleHandler',
  ];

  config.passportGithub = {
    key: '2a23a8643ef32a94d3f5',
    secret: 'b4a30cad94f4f0003d0e50c95ddf86bdfb55c393',
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'liumingyi-blog',
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
