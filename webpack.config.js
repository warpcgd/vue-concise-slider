const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const resolve = dir => path.join(__dirname, '..', dir)
module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? '' : 'inline-source-map',
  devServer: { // 检测代码变化并自动重新编译并自动刷新浏览器
    contentBase: path.resolve(__dirname, 'dist'), // 设置静态资源的根目录
    hot: true
  },
  entry: {
    module: './src/exportModule.js',
    build: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'vueConciseSlider',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss']
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    // 加载器
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      // 解析.vue文件
      {
        test: /.vue$/,
        loader: 'vue-loader'
      },
      // 转化ES6的语法
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // 编译css并自动添加css前缀
      {
        test: /\.css$/,
        use: [ // 应用于模块的 loader 使用列表
          'style-loader',
          'css-loader'
        ]
      },
      // html模板编译
      { test: /\.(html|tpl)$/, loader: 'html-loader' }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
