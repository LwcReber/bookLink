'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwtHandler(app.config.jwt);
  router.post('/api/v1/login', controller.login.login);
  app.router.post('/api/v1/user', controller.user.create);
  app.router.resources('user', '/api/v1/user', jwt, controller.user);
};
