'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('banners', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: STRING(1024), // 标题
      img_url: STRING(1024), // banner图片地址
      relate_id: STRING(255), // 关联的文章id
      content: TEXT, // 文章内容
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('banners');
  }
};
