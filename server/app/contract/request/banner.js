'use strict';

module.exports = {
  createBannerRequest: {
    title: { type: 'string', required: true, description: '标题' },
    content: { type: 'string', required: false, description: '内容' },
    imgUrl: { type: 'string', required: true, description: 'banner图片连接' },
    relateId: { type: 'integer', required: false, description: '关联的文章id' },
  },
  getBanner: {
    id: { type: 'integer', required: true, description: 'banner id' },
  }
};