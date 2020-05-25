'use strict';

const Controller = require('egg').Controller;
const bcrypt = require('bcryptjs');

/**
 * @controller login 用户接口
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
        ctx.status = 200
        const token = ctx.app.jwt.sign({
          name: body.name,
        }, ctx.app.config.jwt.secret, { expiresIn: 60 * 60 });
        ctx.body = { code: 0, data: token };
      } else {
        ctx.status = 200
        ctx.body = { code: -1, msg: '密码错误' }
      }
    } else {
      ctx.status = 200
      ctx.body = { code: -1, msg: '用户查询失败' }
    }
  }
}

module.exports = LoginController;
