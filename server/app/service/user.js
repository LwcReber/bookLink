'use strict';
// app/service/user.js
const Service = require('egg').Service;
const bcrypt = require('bcryptjs');

class UserService extends Service {
  passwordCrypt (psd) {
    // 生成salt的迭代次数
    const saltRounds = 10;
    // 随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    // 获取hash值
    const hash = bcrypt.hashSync(psd, salt);
    return hash;
  }
  async create (data) {
    let { ctx } = this;
    let { name, password } = data;
    // 密码加密
    password = this.passwordCrypt(password);
    console.log(password)
    const user = await ctx.model.User.create({ name, password });
    const token = ctx.helper.signToken({ctx, name})
    return { id: user.id, token };
  }
}
module.exports = UserService;