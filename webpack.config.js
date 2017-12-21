const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

/*
 * We've enabled commonsChunkPlugin for you. This allows your app to
 * load faster and it splits the modules you provided as entries across
 * different bundles!
 *
 * https://webpack.js.org/plugins/commons-chunk-plugin/
 *
 */

module.exports = [
  {
    entry: {
      vendor: ['react', 'react-dom'],
      index: './client/index.js',
      song: './client/song.js',
      playList: './client/playList.js',
      search: './client/search.js',
    },
    devtool: 'source-map',
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
                plugins: [autoprefixer],
              },
            },
          ]),
        },
      ],
    },

    plugins: [
      new ExtractTextPlugin({
        filename: '[name]-[hash].css',
        allChunks: true,
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
    devtool: 'source-map',
    entry: {
      index: './server/routes/index.js',
      song: './server/routes/song.js',
      playList: './server/routes/playList.js',
      search: './server/routes/search.js',
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
                plugins: [autoprefixer],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: 'require(\'source-map-support\').install();',
        raw: true,
        entryOnly: false,
      }),
    ],
  },
];
