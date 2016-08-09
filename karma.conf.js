const webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: ['jsdom'],

    singleRun: false,

    frameworks: [ 'mocha' ],

    files: [
      './webpack/tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'webpack-error' ],

    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-webpack-error-reporter"),
      require("karma-jsdom-launcher"),
      require("karma-sourcemap-loader")
    ],

    mochaReporter: {
      showDiff: true
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240} },
          { test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
          { test: /\.json$/, loader: 'json-loader' }
        ]
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
        })
      ]
    },

    webpackServer: {
      noInfo: true
    }

  });
};
