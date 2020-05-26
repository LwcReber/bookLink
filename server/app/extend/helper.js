'use strict';
module.exports = {
  // 成功处理
  success ({ctx, res = null, msg = 'success'}) {
    ctx.body = {
      code: 0,
      data: res,
      msg
    }
    ctx.status = 200
  },
  // 失败错误处理
  error ({ctx, msg = 'error'}) {
    ctx.body = {
      code: -1,
      data: null,
      msg
    }
    ctx.status = 200
  },
  tokenDecode ({ctx, token}) {
    token = token.substring(7)
    const decode = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
    return decode
  }
}


