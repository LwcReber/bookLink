'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Banner = app.model.define('banner', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(1024), // 标题
    img_url: STRING(255), // banner图片地址
    relate_id: INTEGER, // 关联的文章id
    content: TEXT, // 文章内容
    created_at: DATE,
    updated_at: DATE,
  });

  return Banner;
};