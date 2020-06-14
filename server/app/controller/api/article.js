'use strict';

const Controller = require('egg').Controller;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
   * @router post /api/v1/article/list
   * @Request body getArticleList body // 筛选参数
   * @response 200 baseResponse 
   */
  async list() {  
    const ctx = this.ctx;
    const body = ctx.request.body

    let where = {}
    let query = {}
    let size = toInt(body.pageSize)
    let offset = toInt(body.pageIndex) * size
    query = { limit: size, offset };
    body.create_id && (where.create_id = body.create_id)
    body.title && (where.title = {[Op.like]: '%' + body.title.trim() + '%'}) // 标题模糊搜索
    const whereKeys = Object.keys(where);
    if (whereKeys.length > 0) {
      query.where = where
    }
    console.log(query, '----------------')

    const data = await ctx.model.Article.findAndCountAll(query);
    data.rows.map((item) => {
      if (item.create_by) {
        item.create_by = JSON.parse(item.create_by) || {}
      }
    });
    const res = { list: data.rows, total: data.count }
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 某个用户文章列表
   * @router get /api/v1/article/list/{id}
   * @request path integer id  *path
   * @request query integer pageIndex  *query
   * @request query integer pageSize  *query
   * @response 200 baseResponse 
   */
  async userList () {
    const ctx = this.ctx;
    const params = ctx.params
    let where = { create_id: params.id }
    let size = toInt(ctx.query.pageSize)
    let offset = toInt(ctx.query.pageIndex) * size
    const query = { limit: size, offset, where };
    const data = await ctx.model.Article.findAndCountAll(query);
    data.rows.map((item) => {
      if (item.create_by) {
        item.create_by = JSON.parse(item.create_by) || {}
      }
    });
    const res = { list: data.rows, total: data.count }
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
    if (res.create_by) {
      res.create_by = JSON.parse(res.create_by) || {}
    }
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
