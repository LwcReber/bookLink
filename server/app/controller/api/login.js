'use strict';

const Controller = require('egg').Controller;
const bcrypt = require('bcryptjs');

/**
 * @controller  登录获取token接口
 */
class LoginController extends Controller {
  /**
   * @summary 登录
   * @description 登录
   * @router post /api/v1/login
   * @request body loginUser *body 
   * @response 200 baseResponse 创建成功
  */
  async login() {
    const { ctx } = this
    let body = ctx.request.body
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(ctx.rule.loginUser, body)
    // 查找用户
    const user = await ctx.model.User.findOne({
      where: {
        name: body.name
      }
    })
    if (user) {
      //检查密码是否匹配
      const pwdMatchFlag = bcrypt.compareSync(body.password, user.password);
      if (pwdMatchFlag) {
        // 密码验证通过
        const token =  ctx.helper.signToken({ctx, id: user.id})
        ctx.helper.success({ ctx, res: { token } })
      } else {
        ctx.helper.error({ctx, msg: '密码错误' })
      }
    } else {
      ctx.helper.error({ctx, msg: '无此用户' })
    }
  }
}

module.exports = LoginController;
