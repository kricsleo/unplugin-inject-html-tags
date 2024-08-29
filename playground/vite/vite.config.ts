import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import unpluginInjectHtmlTags from '../../src/vite'

export default defineConfig({
  root: 'src',
  plugins: [
    Inspect(),
    unpluginInjectHtmlTags({
      tags: [
        { tag: 'script', attrs: { src: 'https://example.com/index.js' }, injectTo: 'body-prepend' },
        { tag: 'script', children: 'console.log("injected inline scripts.")', injectTo: 'body' },
        { tag: 'meta', attrs: { name: 'description', content: 'Page Description' }, injectTo: 'head-prepend' },
        { tag: 'style', children: 'body{color:skyblue;}', injectTo: 'head' },
      ],
    }),
  ],
})
