const paths = require('./paths')
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [paths.src + '/index.ts'],
    output: {
        filename: '[name].bundle.js',
        path: paths.build,
    },
    module: {
      rules: [
          // TypeScript
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // Styles: Inject CSS into the head with source maps
            {
                test: /\.(scss|css)$/,
                use: [
                'style-loader',
                {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
                {loader: 'postcss-loader', options: {sourceMap: true}},
                {loader: 'sass-loader', options: {sourceMap: true}},
                ],
            },
            // Fonts and SVGs
            {
              test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
              type: 'asset/inline',
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    
  ////// development
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },  
  ////// PLUGINS 
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        template: paths.src + '/index.html', // index file
        filename: 'index.html', // output file
    }),      
  ],

}