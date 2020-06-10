'use strict';
// app/service/user.js
const Service = require('egg').Service;

class BannerService extends Service {
  async create (data) {
    let { ctx } = this;
    let { title, content, img_url, relate_id, status } = data;
    const banner = {
      title, 
      content: content ? content : null,
      img_url,
      relate_id: relate_id ? relate_id : 0,
      status
    }
    const nbanner = await ctx.model.Banner.create(banner);
    return nbanner.id;
  }
}
module.exports = BannerService;