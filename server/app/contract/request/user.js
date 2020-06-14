'use strict';

module.exports = {
  createUserRequest: {
    name: { type: 'string', required: true, description: '用户姓名' },
    password: { type: 'string', required: true, description: '密码' }
  },
  updateUser: {
    avatar: { type: 'string', required: true, description: '头像' },
  }
};