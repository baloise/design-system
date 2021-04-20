module.exports = {
  configureWebpack: {
    mode: process.env.NODE_ENV,
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
  },
  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(1000000).maxAssetSize(1000000)
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/app-name' : '/',
  devServer:
    process.env.NODE_ENV !== 'production'
      ? {
          proxy: {
            '^/api': {
              target: 'http://localhost:8080/your-app-name',
              changeOrigin: true,
            },
          },
        }
      : {},
}
