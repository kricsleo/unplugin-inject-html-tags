const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const unpluginInjectHtmlTags = require('../../dist/webpack.cjs')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin(),
    unpluginInjectHtmlTags({
      tags: [
        {
          tag: 'script',
          attrs: {
            src: 'https://cdn.jsdelivr.net/npm/lodash@1',
          },
          injectTo: 'head-prepend',
        },
        {
          tag: 'script',
          attrs: {
            src: 'https://cdn.jsdelivr.net/npm/lodash@2',
          },
          injectTo: 'head',
        },
        {
          tag: 'script',
          attrs: {
            src: 'https://cdn.jsdelivr.net/npm/lodash@3',
          },
          injectTo: 'body-prepend',
        },
        {
          tag: 'script',
          attrs: {
            src: 'https://cdn.jsdelivr.net/npm/lodash@4',
          },
          injectTo: 'body',
        },
      ],
    }),
  ],
  stats: 'errors-only',
}
