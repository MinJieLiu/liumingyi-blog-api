module.exports = (app) => {
  const { model } = app;
  const {
    STRING,
    INTEGER,
    TEXT,
  } = app.Sequelize;
  const CmsPost = model.define('CmsPost', {

    name: {
      type: STRING(200),
      comment: '名称',
    },

    title: {
      type: STRING(255),
      allowNull: false,
      comment: '标题',
    },

    userId: {
      type: INTEGER,
      comment: '用户 Id',
    },

    groupId: {
      type: INTEGER,
      comment: '分组 Id',
    },

    type: {
      type: STRING(20),
      allowNull: false,
      comment: '类型',
    },

    excerpt: {
      type: TEXT,
      comment: '摘抄',
    },

    content: {
      type: TEXT,
      comment: '内容',
    },

    status: {
      type: STRING(20),
      allowNull: false,
      comment: '状态',
    },

    commentStatus: {
      type: STRING(20),
      comment: '评论状态',
    },

    order: {
      type: INTEGER,
      defaultValue: 0,
      comment: '排序',
    },

  }, {
    tableName: 'cms_posts',
    comment: '文章表',
    indexes: [
      { fields: ['name', 'title', 'type'] },
    ],
  });

  CmsPost.associate = () => {
    model.CmsPost.hasMany(model.CmsComment);

    model.CmsPost.belongsTo(model.CmsGroup);

    model.CmsPost.belongsToMany(model.CmsTag, {
      through: 'cms_post_tags',
    });
  };

  return CmsPost;
};
