const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: { main: './src/app.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: './js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'img',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          name: '[name].[ext]',
        },
      },
    ],
  },
  devServer: {
    contentBase: './',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
    new CopyPlugin([
      { from: 'src/img', to: 'img' },
    ]),
    new CopyPlugin([
      { from: 'src/js/scripts', to: 'js' },
    ]),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
