'use strict';

module.exports = {
  createArticle: {
    title: { type: 'string', required: true, description: '标题' },
    content: { type: 'string', required: false, description: '内容' },
  },
  getArticleList: {
    create_id: { type: 'integer', required: false, description: '用户id' },
    title: { type: 'string', required: false, description: '文章标题' }
  }
};