'use strict';
// app/service/user.js
const Service = require('egg').Service;

class ArticleService extends Service {
  async create (data) {
    let { ctx } = this;
    let { title, content } = data;
    const article = {
      title, 
      content,
      create_by: JSON.stringify({id: 1, name: 'string'})
    }
    const narticle = await ctx.model.Article.create(article);
    return narticle.id;
  }
}
module.exports = ArticleService;