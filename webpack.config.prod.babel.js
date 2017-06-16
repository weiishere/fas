import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import MappingPlugin from 'webpack-mapping-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

// const path =require('path');
// const webpack =require('webpack');
// const ExtractTextPlugin =require('extract-text-webpack-plugin');
// const MappingPlugin =require('webpack-mapping-plugin');
// const precss =require('precss');
// const autoprefixer =require('autoprefixer');

const appPath = path.resolve(__dirname, 'public');
const nodeModules = path.resolve(__dirname, 'node_modules');

// multiple extract instances
const extractLess = new ExtractTextPlugin({
  filename: 'css/[name].[chunkhash].css',
  allChunks: true
});
const extractCSS = new ExtractTextPlugin({
  filename: 'css/style.[name].[chunkhash].css',
  allChunks: true
});

const webpackConfig = {
  devtool: 'cheap-source-map',
  entry: {
    crowdFunding:['./client/pages/crowdFunding/index.js'],
    index:['./client/pages/index/index.js'],
    home: ['./client/pages/home/index.js'],
    about: ['./client/pages/about/index.js'],
    page1: ['./client/pages/page-1/index.js'],
    page2: ['./client/pages/page-2/index.js'],
    vendor: [
      'react',
      'react-dom'
    ]
  },

  output: {
    path: path.resolve(appPath, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/fas-sys/dist/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less','.jpg','.png','.gif'],
    //模块别名定义，方便直接引用别名
    alias: {
      'react-router-redux': path.resolve(nodeModules, 'react-router-redux-fixed/lib/index.js'),
    },
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        query: {
          name: '[hash].[ext]',
          limit: 10000, // 10kb
        }
      },
      {
        test: /\.(mp4|ogg|eot|woff|ttf|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!postcss-loader?pack=cleaner'
        })
      },
      {
        test: /\.less/,
        // exclude: /node_modules/,
        loader: extractLess.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!postcss-loader?pack=cleaner!less-loader'
        })
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js',
    }),
    extractLess,
    extractCSS,
    new MappingPlugin({
      basePath: '/fas-sys/dist/',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss () {
          return {
            defaults: [precss, autoprefixer],
            cleaner: [autoprefixer({
              browsers: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12',
                'Explorer >= 8', 'Android >= 4.3', 'iOS >=8', 'Safari >= 8']
            })]
          };
        },
      }
    })
  ],
};

export default webpackConfig;