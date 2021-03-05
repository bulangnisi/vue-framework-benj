'use strict'
const path = require('path')
const port = process.env.port || process.env.npm_config_port || 8998
const isDev = process.env.NODE_ENV === 'development'
// eslint-disable-next-line no-unused-vars
const isProd = process.env.NODE_ENV === 'production'
const chalk = require('chalk')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: isDev,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 16, //根字体大小 设计稿宽度 / 10 / 2
            unitPrecision: 5, //允许REM单位增长到的十进制数字。
            // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: /(node_modules)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
            minPixelValue: 3 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      }
    }
  },
  chainWebpack(config) {
    config.when(
      process.env.NODE_ENV === 'production',
      (config) => {
        console.log(chalk.cyan('in truthy'))
        /**
         * add runtime.hash.js in html template
         */
        config
          .plugin('ScriptExtHtmlWebpackPlugin')
          .after('html')
          .use('script-ext-html-webpack-plugin', [
            {
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }
          ])
          .end()
        /**
         * use terser optimization
         */
        config.optimization
          .minimizer('Terser')
          .use(require('terser-webpack-plugin'), [
            {
              test: /\.js(\?.*)?$/i
            }
          ])
          .end()
        /**
         *  use gzip
         */
        config
          .plugin('CompressionWebpackPlugin')
          .use('compression-webpack-plugin', [
            {
              algorithm: 'gzip',
              test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
              threshold: 10240,
              minRatio: 0.8
            }
          ])
          .end()
        /**
         * split chunks
         */
        config.optimization.splitChunks({
          chunks: 'all',
          minChunks: 1,
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              reuseExistingChunk: true
            },
            common: {
              name: 'components',
              test: resolve('src/components'),
              priority: 20,
              reuseExistingChunk: true
            }
          }
        })
        config.optimization.runtimeChunk('single')
      },
      (config) => {
        console.log(chalk.red('in falsy', config))
      }
    )
    config.resolve.alias.set('@', resolve('src')).end()
  }
}
