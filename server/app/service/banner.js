'use strict';
// app/service/user.js
const Service = require('egg').Service;

class BannerService extends Service {
  async create (data) {
    let { ctx } = this;
    let { title, content, imgUrl, relateId } = data;
    const banner = {
      title, 
      content: content ? content : null,
      img_url: imgUrl,
      relate_Id: relateId ? relateId : null
    }
    const nbanner = await ctx.model.Banner.create(banner);
    return nbanner.id;
  }
}
module.exports = BannerService;