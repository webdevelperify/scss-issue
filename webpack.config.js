const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = async (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './src/index.tsx', // Entry point for your application
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
      assetModuleFilename: 'assets/[hash][ext][query]', // Asset output path
    },
    devtool: isDevelopment ? 'eval-source-map' : 'source-map', // Source map for debugging
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'], // File extensions to resolve
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, // TypeScript and TSX
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.module\.scss$/, // SCSS Modules
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]', // CSS class naming
                },
                sourceMap: isDevelopment,
              },
            },
            'sass-loader'
          ],
        },
        /*{
          test: /\.scss$/, // Global SCSS
          exclude: /\.module\.scss$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },*/
        {
          test: /\.css$/, // Regular CSS
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|ico)$/, // Image assets
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/, // Font assets
          type: 'asset/resource',
        },
        {
          test: /\.html$/, // HTML files
          use: 'html-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(), // Cleans the output directory
      new HtmlWebpackPlugin({
        template: './src/index.html', // HTML template file
        favicon: './src/favicon.ico', // Optional favicon
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css',
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 3000,
      hot: true, // Enable HMR
      open: true, // Automatically open the browser
    },
    optimization: {
      splitChunks: {
        chunks: 'all', // Code splitting for optimization
      },
    },
  };
};
