'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * @controller banner 接口
 */
class BannerController extends Controller {
  /**
   * @summary banner列表
   * @router get /api/v1/banner
   * @response 200 baseResponse
   */
  async index() {
    const ctx = this.ctx;
    // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const res = await ctx.model.Banner.findAll();
    ctx.helper.success({ ctx, res })
  }
  /**
   * @summary banner详情
   * @description banner
   * @router get /api/v1/banner/{id}
   * @request path integer id  *query
   * @response 200 baseResponse
   */
  async show() {
    const ctx = this.ctx;
    const res = await ctx.model.Banner.findByPk(toInt(ctx.params.id));
    if (res) {
      ctx.helper.success({ ctx, res })
    } else {
      ctx.helper.error({ ctx, msg: '没有该banner' })
    }
  }

  /**
   * @summary 新增banner
   * @description 新增banner
   * @router post /api/v1/banner
   * @request body createBannerRequest *body
   * @response 200 baseResponse
   */
  async create() {
    const { ctx, service } = this
    let body = ctx.request.body
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(ctx.rule.createBannerRequest, body)

    const id = await service.banner.create(body);
    ctx.helper.success({ ctx, res: { id } })

  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = BannerController;
