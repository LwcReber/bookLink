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
    const data = await ctx.model.Banner.findAndCountAll();
    const res = { list: data.rows, total: data.count }
    ctx.helper.success({ ctx, res })
  }
  /**
   * @summary web端首页banner列表
   * @router get /api/v1/banner/home
   * @response 200 baseResponse
   */
  async banner() {
    const ctx = this.ctx;
    // web端首页，只查找已上架的banner
    const res = await ctx.model.Banner.findAll({ where: { status: 'published' } });
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
   * @Bearer
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
  /**
   * @summary 更新banner
   * @description 更新banner
   * @router post /api/v1/banner/{id}
   * @request path integer id  *query
   * @request body createBannerRequest *body
   * @Bearer
   * @response 200 baseResponse
   */
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const banner = await ctx.model.Banner.findByPk(id);
    if (!banner) {
      ctx.helper.error({ ctx, msg: '没有该banner' })
      return;
    }

    const { title, content, img_url, relate_id, status } = ctx.request.body;
    await banner.update({ title, status, content, img_url, relate_id });
    ctx.helper.success({ ctx })
  }
  /**
   * @summary 删除banner
   * @description 删除banner
   * @router delete /api/v1/banner/{id}
   * @request path integer id  *query
   * @Bearer
   * @response 200 baseResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const banner = await ctx.model.Banner.findByPk(id);
    if (!banner) {
      ctx.helper.error({ ctx, msg: '没有该banner' })
      return;
    }

    await banner.destroy();
    ctx.helper.success({ ctx, res: {id} })
  }
}

module.exports = BannerController;
