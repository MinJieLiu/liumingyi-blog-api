module.exports = (app) => {
  const { model } = app;
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const CmsComment = model.define('cmsComment', {

    postId: {
      type: INTEGER,
      allowNull: false,
      comment: '文章 Id',
    },

    userId: {
      type: INTEGER,
      comment: '用户 Id',
    },

    parentId: {
      type: INTEGER,
      allowNull: false,
      comment: '上级 Id',
    },

    type: {
      type: STRING(20),
      comment: '类型',
    },

    content: {
      type: TEXT,
      comment: '内容',
    },

    status: {
      type: STRING(20),
      comment: '状态',
    },

  }, {
    tableName: 'cms_comments',
    comment: '评论表',
    indexes: [
      { fields: ['postId', 'parentId'] },
    ],
  });

  CmsComment.associate = () => {
    model.CmsComment.belongsTo(model.CmsPost);
  };

  return CmsComment;
};
