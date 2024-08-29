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
        { tag: 'script', attrs: { src: 'https://example.com/index.js' }, injectTo: 'body-prepend' },
        { tag: 'script', children: 'console.log("injected inline scripts.")', injectTo: 'body' },
        { tag: 'meta', attrs: { name: 'description', content: 'Page Description' }, injectTo: 'head-prepend' },
        { tag: 'style', children: 'body{color:skyblue;}', injectTo: 'head' },
      ],
    }),
  ],
  stats: 'errors-only',
}
