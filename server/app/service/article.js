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
          name: decode.name
        }
      });
      if (user) {
        let { title, content } = data;
        const { id, name, created_at, avatar } = user
        const article = {
          title, 
          content,
          create_id: user.id, // 创建者id
          create_by: JSON.stringify({ id, name, created_at, avatar: avatar || 'http://img5.imgtn.bdimg.com/it/u=3392663359,4194879068&fm=26&gp=0.jpg' })
        }
        const narticle = await ctx.model.Article.create(article);
        return narticle.id;
      }
    } catch (error) {
      ctx.helper.error({ ctx, msg: '无此用户, 新增失败' })
    }
   
  }
}
module.exports = ArticleService;