//node的路径模块
var path = require('path')
//我们是webpack当然要引入这个
var webpack = require('webpack')
//这个是构建页面资源的插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
//因为我们是vue.js的应用，把各个组件当做一个页面.vue后缀，所以引入这个可以编译這些文件
var vue = require("vue-loader")


// __dirname是node里面的一个变量，指向的是当前文件夹目录
var ROOT_PATH = path.resolve(__dirname)
// 这个我们的文件入口，等下我们就会从main.js这个文件作为入口
var APP_PATH = path.resolve(ROOT_PATH, 'src/main')
// 这个是文件打包出来的输出路径
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
module.exports = {
  entry: {
    build: './src/main.js',
    module: './src/exportModule.js'
  },
  output: {
    //输出路径
    path: BUILD_PATH,
    //打包的js命名
    filename: '[name].js',
    // 指向异步加载的路径
    publicPath: __dirname + '/dist/',
    // 非主文件的命名规则，加缓存用到md5
    chunkFilename: '[id].[name].js?[chunkhash]',
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
      //.scss 文件想要编译，scss就需要这些东西！来编译处理
      //install css-loader style-loader sass-loader node-sass --save-dev
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap' },
      // 图片转化，小于8K自动转化为base64的编码
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' },
      //html模板编译？
      { test: /\.(html|tpl)$/, loader: 'html-loader' },
    ]
  },
  // vue的单独配置
  // vue: {
  //   loaders: {
  //     css: 'style!css!autoprefixer',
  //   }
  // },
  // 转化成es5的语法
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  resolve: {
    // require时省略的扩展名，如：require('module') 不需要module.js
    extensions: ['', '.js', '.vue'],
    // 别名，可以直接使用别名来代表设定的路径以及其他
    alias: {
      filter: path.join(__dirname, './src/filters'),
      components: path.join(__dirname, './src/components')
    }
  },
  // 开启source-map，webpack有多种source-map，在官网文档可以查到
  devtool: 'eval-source-map',
}
