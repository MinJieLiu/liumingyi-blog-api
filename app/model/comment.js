module.exports = (app) => {
  const { model } = app;
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Comment = model.define('comment', {

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

  Comment.associate = () => {
    model.Comment.belongsTo(model.Post);
  };

  return Comment;
};
