
'use strict';
// jwt 白名单，不需要jwt验证
const WhiteList = ['/api/v1/login']
// get请求白名单
// const WhiteGetList = []
// post请求白名单
const WhitePostList = ['/api/v1/user']
module.exports = options => {
  return async function jwt(ctx, next) {
    const path = ctx.path
    // 白名单控制
    if (WhiteList.includes(path)) {
      await next();
      return
    }
    if (ctx.request.method === 'POST') {
      if (WhitePostList.includes(path)) {
        await next();
        return
      }
    }
    let token = ctx.request.header.authorization;
    let decode
    if (token) {
      try {
        token = token.substring(7)
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);
        console.log(decode, 'decodedecodedecode')
        await next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          message: error.message,
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        message: '没有token',
      };
      return;
    }
  }
}