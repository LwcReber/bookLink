'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const download = require('image-downloader');
const fileFolder = '/public/img' // 文件存放目录
/**
 * @controller 上传
 */
class uploadControler extends Controller {
  constructor (ctx) {
    super(ctx)
  }
  /**
   * @summary 上传单个文件
   * @router post /api/v1/upload
   * @request formData file *file
   * @response 200 baseResponse 
   */
  async create () {
    const { ctx } = this
    const stream = await ctx.getFileStream()
    const filename = path.basename(stream.filename)
    const extname = path.extname(stream.filename).toUpperCase()
    const uuid = (Math.random() * 9999999).toFixed()
    let newFileName = `${uuid}_${filename}`
    // 可以上传云储存地址，此处存放在服务器本地使用
    const target = path.join(this.config.baseDir, 'app' + fileFolder, newFileName)
    const writeStream = fs.createWriteStream(target)
    try {
      await awaitWriteStream(stream.pipe(writeStream))
    } catch (error) {
      await sendToWormhole(stream)
      throw error
    }
    ctx.helper.success({ctx, res: 'http://127.0.0.1:7001' + fileFolder + newFileName})
  }
}
module.exports = uploadControler