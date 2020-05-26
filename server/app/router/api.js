'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiV1Router = app.router.namespace('/api/v1');
  const { controller, jwt } = app;

  const { user, banner, login, article } = controller.api;

  // 登录
  apiV1Router.post('/login', login.login);
  // 用户
  apiV1Router.resources('user', '/user', jwt, user);
  
  // banner
  apiV1Router.get('banner', banner.index)
  apiV1Router.get('/banner/:id', banner.show)
  apiV1Router.post('/banner', jwt, banner.create)
  apiV1Router.post('/banner/:id', jwt, banner.update)
  
  // article
  apiV1Router.post('/article/list', article.list)
  apiV1Router.get('/article/:id', article.show)
  apiV1Router.post('/article', jwt, article.create)
  apiV1Router.post('/article/:id', jwt, article.update)
}