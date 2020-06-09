'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Article = app.model.define('articles', {
    id: { type: STRING(255), primaryKey: true, autoIncrement: true },
    title: STRING(1024), // 标题
    content: TEXT, // 文章内容
    create_id: INTEGER,
    create_by: STRING(2048), // 创建者对象信息
    created_at: DATE,
    updated_at: DATE,
  });

  return Article;
};