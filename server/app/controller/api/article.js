'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * @controller 文章 接口
 */
class ArticleController extends Controller {
  /**
   * @summary 文章列表
   * @router get /api/v1/article
   * @response 200 baseResponse
   */
  async index() {
    const ctx = this.ctx;
    // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const res = await ctx.model.Article.findAll();
    ctx.helper.success({ ctx, res })
  }
  /**
   * @summary 文章详情
   * @description 文章详情
   * @router get /api/v1/article/{id}
   * @request path integer id  *query
   * @response 200 baseResponse
   */
  async show() {
    const ctx = this.ctx;
    const res = await ctx.model.Article.findByPk(toInt(ctx.params.id));
    if (res) {
      ctx.helper.success({ ctx, res })
    } else {
      ctx.helper.error({ ctx, msg: '没有该文章' })
    }
  }

  /**
   * @summary 新增article
   * @description 新增article
   * @router post /api/v1/article
   * @request body createArticle *body
   * @Bearer
   * @response 200 baseResponse
   */
  async create() {
    const { ctx, service } = this
    let body = ctx.request.body
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(ctx.rule.createArticle, body)

    const id = await service.article.create(body);
    ctx.helper.success({ ctx, res: { id } })

  }
  /**
   * @summary 更新article
   * @description 更新article
   * @router post /api/v1/article/{id}
   * @request path integer id  *query
   * @request body createBannerRequest *body
   * @Bearer
   * @response 200 baseResponse
   */
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const article = await ctx.model.Article.findByPk(id);
    if (!article) {
      ctx.helper.error({ ctx, msg: '没有该文章' })
      return;
    }

    const { title, content, imgUrl, relateId } = ctx.request.body;
    await article.update({ title, content, img_url: imgUrl, relate_id: relateId });
    ctx.helper.success({ ctx, res: article })
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

module.exports = ArticleController;
