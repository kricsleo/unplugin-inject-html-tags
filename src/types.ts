import type { HtmlTagDescriptor } from 'vite'

export interface Options {
  /**
   * HTML tags to inject.
   *
   * @default `tags.injectTo`: 'head-prepend'
   * @see https://vitejs.dev/guide/api-plugin.html#transformindexhtml
   */
  tags: HtmlTagDescriptor[]
}
