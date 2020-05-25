'use strict';
// app/controller/users.js
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * @controller user 用户接口
 */
class UserController extends Controller {
   /**
   * @summary 根据token查询用户
   * @description 根据token查询用户
   * @router get /api/v1/user
   * @Request header string authorization
   * @response 200 baseResponse
   */
  async index() {
    const ctx = this.ctx;
    let token = ctx.request.header.authorization;
    token = token.substring(7)
    const decode = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
    try {
      const user = await ctx.model.User.findOne({
        where: {
          name: decode.name
        }
      });
      ctx.status = 200;
      if (user) {
        const { id, name, created_at } = user;
        ctx.body = { code: 0, data: { id, name, created_at } };
      }
    } catch (error) {
      ctx.status = 200;
      ctx.body = {msg: '无此用户'};
    }
  }

 
  async show() {
   
  }
  
  /**
   * @summary 创建用户
   * @description 创建用户
   * @router post /api/v1/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this
    let body = ctx.request.body
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(ctx.rule.createUserRequest, body)

    // 查询是否有同名用户
    let user = await ctx.model.User.findOne({
      where: {
        name: body.name
      }
    });
    if (user) {
      ctx.status = 200;
      ctx.body = { code: -1, data: null, msg: '该用户名已被注册' };
      return
    }
    const id = await service.user.create(body);
    ctx.status = 200;
    ctx.body = { code: 0, data: { id } };
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

module.exports = UserController;