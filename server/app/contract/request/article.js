'use strict';

module.exports = {
  createArticle: {
    title: { type: 'string', required: true, description: '标题' },
    content: { type: 'string', required: false, description: '内容' },
  }
};