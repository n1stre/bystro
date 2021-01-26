const path = require('path');
const webpack = require('webpack');
const getTypescriptPaths = require("./webpack.tspaths")


module.exports = {
  entry: './src/index.ts',
  mode: "development",
  target: "node",
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    fullySpecified: false,
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: getTypescriptPaths()
  },
  output: {
    filename: 'bin.js',
    path: path.resolve(__dirname, 'lib'),
  },
};
