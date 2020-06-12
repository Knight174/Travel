// webpack配置：配置文件路径别名和代理服务器等等
const path = require('path');

module.exports = {
  chainWebpack: config => { // webpack链式语法
    config.resolve.alias // 设置别名
      .set('styles', path.join(__dirname, './src/assets/styles/'))
      .set('@', path.join(__dirname, './src/'))
      .set('common', path.join(__dirname, './src/common/'))
  },
  devServer: { // 设置代理服务器
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': '/mock'
        }
      }
    }
  },
  publicPath: '/new-project/'
};