const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'/',
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://gb2.gjestebok.no/api',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
})
