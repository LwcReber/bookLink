'use strict';

module.exports = {
  loginUser: {
    name: { type: 'string', required: true, description: '用户姓名' },
    password: { type: 'string', required: true, description: '密码' },
  }
};