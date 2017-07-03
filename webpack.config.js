//  node的路径模块
var path = require('path')
//  我们是webpack当然要引入这个
var webpack = require('webpack')
//  这个是构建页面资源的插件
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
//  因为我们是vue.js的应用，把各个组件当做一个页面.vue后缀，所以引入这个可以编译這些文件
// var vue = require("vue-loader")

module.exports = {
  entry: {
    module: './src/exportModule.js',
    build: './src/main.js'
  },
  output: {
    path: './dist/',
    filename: '[name].js',
    library: 'vue-concise-slider',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [ '', '.js', '.vue' ]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: path.resolve(__dirname, './'),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: path.resolve(__dirname, './'),
        exclude: /node_modules/
      }
    ],
    // 加载器
    loaders: [
      // 解析.vue文件
      { test: /\.vue$/, loader: 'vue' },
      // 转化ES6的语法
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      // 编译css并自动添加css前缀
      { test: /\.css$/, loader: 'style!css!autoprefixer' },
      // .scss 文件想要编译，scss就需要这些东西！来编译处理
      // install css-loader style-loader sass-loader node-sass --save-dev
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap' },
      // 图片转化，小于8K自动转化为base64的编码
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' },
      // html模板编译
      { test: /\.(html|tpl)$/, loader: 'html-loader' }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
}
