'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  // 登录
  router.post('/api/v1/login', controller.login.login);
  // 用户
  router.resources('user', '/api/v1/user', jwt, controller.user);
  
  // banner
  router.get('/api/v1/banner', controller.banner.index)
  router.get('/api/v1/banner/:id', controller.banner.show)
  router.post('/api/v1/banner', jwt, controller.banner.create)
};
