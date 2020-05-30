'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    avatar: STRING(255),
    age: INTEGER,
    password: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};