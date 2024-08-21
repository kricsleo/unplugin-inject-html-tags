import type { Compiler } from 'webpack'
import type { HtmlTagObject } from 'html-webpack-plugin'
import type { Options } from '../types'
import { viteHtmlTagToWebpackHtmlTag } from './htmlTags'

export function checkWebpackHtmlPlugin(pluginName: string, compiler: Compiler): void {
  compiler.hooks.emit.tapAsync(pluginName, async (compilation, cb) => {
    try {
      await import('html-webpack-plugin')
    } catch (e) {
      console.error(e)
      throw new Error('Cannot find `html-webpack-plugin`. Please make sure it is installed.')
    }

    const htmlWebpackPluginConfigured = compilation.options.plugins.some(
      plugin => plugin?.constructor.name === 'HtmlWebpackPlugin',
    )
    if (!htmlWebpackPluginConfigured) {
      throw new Error('Cannot find `HtmlWebpackPlugin` in webpack plugins. Please make sure it is configured.')
    }
    cb()
  })
}

export function injectWebpackHtmlTags(
  pluginName: string,
  compiler: Compiler,
  tags: Options['tags'],
): void {
  compiler.hooks.compilation.tap(pluginName, async compilation => {
    const HtmlWebpackPlugin = (await import('html-webpack-plugin')).default
    const hooks = HtmlWebpackPlugin.getHooks(compilation)

    hooks.alterAssetTagGroups.tapAsync(pluginName, (data, cb) => {
      const headPrependTags: HtmlTagObject[] = []
      const headAppendTags: HtmlTagObject[] = []
      const bodyPrependTags: HtmlTagObject[] = []
      const bodyAppendTags: HtmlTagObject[] = []

      for (const _tag of tags) {
        const injectTo = _tag.injectTo || 'head-prepend'
        const tag = viteHtmlTagToWebpackHtmlTag(_tag, pluginName)
        if (injectTo === 'head-prepend') {
          headPrependTags.push(tag)
        } else if (injectTo === 'head') {
          headAppendTags.push(tag)
        } else if (injectTo === 'body-prepend') {
          bodyPrependTags.push(tag)
        } else if (injectTo === 'body') {
          bodyAppendTags.push(tag)
        }
      }

      data.headTags.unshift(...headPrependTags)
      data.headTags.push(...headAppendTags)
      data.bodyTags.unshift(...bodyPrependTags)
      data.bodyTags.push(...bodyAppendTags)

      cb(null, data)
    })
  })
}
