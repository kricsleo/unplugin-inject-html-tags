import { createUnplugin } from 'unplugin'
import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import { checkWebpackHtmlPlugin, injectWebpackHtmlTags } from './utils/htmlWebpackPlugin'

const PLUGIN_NAME = 'unplugin-inject-html-tags'

export const unpluginFactory: UnpluginFactory<Options> = options => {
  return {
    name: PLUGIN_NAME,
    vite: {
      transformIndexHtml() {
        return options.tags
      },
    },
    webpack: compiler => {
      checkWebpackHtmlPlugin(PLUGIN_NAME, compiler)
      injectWebpackHtmlTags(PLUGIN_NAME, compiler, options.tags)
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)
export default unplugin
