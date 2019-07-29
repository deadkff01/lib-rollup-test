const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = env => {
  const isProduction = env.NODE_ENV === 'production'
  const config = {
    mode: env.NODE_ENV,
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'public/'),
      publicPath: env.NODE_ENV === 'development' ? 'http://localhost:3333/' : '/', // macbook problem in hrm
      filename: 'bundle.js',
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.join(__dirname, 'public/index.html'),
        inject: false,
        filename: 'index.html',
      }),
    ],
    devServer: {
      port: 3333,
      contentBase: path.join(__dirname, 'public/'),
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            emitError: true,
            failOnError: true,
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(woff2?|ttf|gif|svg|eot|otf|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
        },
      ],
    },
    optimization: {
      minimizer: [new TerserPlugin()],
    },
    watch: !isProduction,
    watchOptions: {
      poll: !isProduction,
    },
    devtool: isProduction ? 'none' : 'inline-cheap-module-source-map',
  }
  return config
}
