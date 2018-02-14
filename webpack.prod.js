const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const CompressionPlugin = require('compression-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*
 * We've enabled commonsChunkPlugin for you. This allows your app to
 * load faster and it splits the modules you provided as entries across
 * different bundles!
 *
 * https://webpack.js.org/plugins/commons-chunk-plugin/
 *
 */

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    entry: {
      vendor: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react'],
      index: './client/index.js',
    },

    output: {
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[hash].js',
      path: path.resolve(__dirname, './public/build'),
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(scss|css)$/,

          use: ExtractTextPlugin.extract([
            {
              loader: 'css-loader',
              query: {
                localIdentName: '[hash:8]',
                modules: true,
              },
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  autoprefixer,
                  pxtorem({
                    rootValue: 14,
                    propList: ['*'],
                    selectorBlackList: ['html'],
                  }),
                ],
              },
            },
          ]),
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new UglifyJSPlugin(),
      new ExtractTextPlugin({
        filename: '[name]-[hash].css',
        allChunks: true,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
      }),
      new CompressionPlugin({
        test: /\.js|.css/,
      }),
      new OfflinePlugin({
        appShell: '/?pwa=true',
        externals: ['https://www.yinyuetai.fun/?pwa=true', 'https://fonts.googleapis.com/icon?family=Material+Icons'],
        ServiceWorker: {
          output: '../sw.js',
          publicPath: '/sw.js',
          navigateFallbackURL: '/?pwa=true',
          minify: true,
        },
        AppCache: false,
      }),
      function OutputHash() {
        this.plugin('done', (stats) => {
          fs.writeFileSync(path.join(__dirname, 'server', 'stats.generated.json'), JSON.stringify({
            hash: stats.toJson().hash,
          }));
        });
      },
    ],
  },
  {
    target: 'node',
    externals: [nodeExternals()],
    entry: {
      application: './server/routes/application.js',
    },

    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, './server/build'),
      libraryTarget: 'commonjs2',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(scss|css)$/,

          use: [
            {
              loader: 'css-loader/locals?modules',
              query: {
                localIdentName: '[hash:8]',
                modules: true,
              },
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  autoprefixer,
                  pxtorem({
                    rootValue: 14,
                    propList: ['*'],
                    selectorBlackList: ['html'],
                  }),
                ],
              },
            },
          ],
        },
      ],
    },
  },
];
