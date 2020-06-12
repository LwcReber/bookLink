'use strict';
// app/service/user.js
const Service = require('egg').Service;

class ArticleService extends Service {
  async create (data) {
    let { ctx } = this;
    try {
      let token = ctx.request.header.authorization;
      const decode = ctx.helper.tokenDecode({ctx, token})
      const user = await ctx.model.User.findOne({
        where: {
          id: decode.id
        }
      });
      
      if (user) {
        let { title, content } = data;
        const { id, name, created_at, avatar } = user
        const article = {
          title, 
          content,
          create_id: user.id, // 创建者id
          create_by: JSON.stringify({ id, name, created_at, avatar })
        }
        console.log(article)
        const narticle = await ctx.model.Article.create(article);
        return narticle.id;
      }
    } catch (error) {
      ctx.helper.error({ ctx, msg: '无此用户, 新增失败' })
    }
   
  }
}
module.exports = ArticleService;