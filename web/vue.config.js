module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "~@/styles/variable.scss";
        `
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: '127.0.0.1:7001',
        changeOrigin: true,
      }
    }
  }
}
