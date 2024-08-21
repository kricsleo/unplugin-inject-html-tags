import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import unpluginInjectHtmlTags from '../../src/vite'

export default defineConfig({
  root: 'src',
  plugins: [
    Inspect(),
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
})
