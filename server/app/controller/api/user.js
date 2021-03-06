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
   * @Bearer
   * @response 200 baseResponse
   */
  async index() {
    const ctx = this.ctx;
    let token = ctx.request.header.authorization;
    const decode = ctx.helper.tokenDecode({ctx, token})
    try {
      const user = await ctx.model.User.findOne({
        where: {
          id: decode.id
        }
      });
      if (user) {
        const { id, name, created_at, avatar } = user;
        const res = { id, name, created_at, avatar };
        ctx.helper.success({ ctx, res })
      }
    } catch (error) {
      ctx.helper.error({ ctx, msg: '无此用户' })
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
    console.log(user)
    if (user) {
      ctx.helper.error({ ctx, msg: '该用户名已被注册' })
      return
    }
    const userData = await service.user.create(body);
    ctx.helper.success({ ctx, res: userData })

  }
  /**
   * @summary 更新用户
   * @description 创建用户
   * @router post /api/v1/user/{id}
   * @request path integer id  *query
   * @request body updateUser *body
   * @Bearer
   * @response 200 baseResponse 创建成功
   */
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.helper.error({ ctx, msg: '无此用户' })
      return;
    }

    const { avatar } = ctx.request.body;
    await user.update({ avatar });
    ctx.helper.success({ ctx })
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