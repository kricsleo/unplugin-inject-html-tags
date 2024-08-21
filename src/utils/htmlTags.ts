import type { HtmlTagDescriptor } from 'vite'
import type { HtmlTagObject } from 'html-webpack-plugin'

export function viteHtmlTagToWebpackHtmlTag(
  tag: HtmlTagDescriptor,
  pluginName: string,
): HtmlTagObject {
  const voidTag = isVoidTag(tag.tag)
  const innerHTML = tag.children
    ? viteHtmlTagChildrenToHtmlStr(tag.children)
    : undefined

  return {
    tagName: tag.tag,
    attributes: tag.attrs || {},
    voidTag,
    innerHTML,
    meta: { plugin: pluginName },
  }
}

function viteHtmlTagChildrenToHtmlStr(children: HtmlTagDescriptor['children']): string {
  if (typeof children === 'string') {
    return children
  } else if (Array.isArray(children)) {
    return children.map(viteHtmlTagTohtmlStr).join('')
  }
  return ''
}

function viteHtmlTagTohtmlStr(tag: HtmlTagDescriptor): string {
  let html = `<${tag.tag}`

  if (tag.attrs) {
    for (const [key, value] of Object.entries(tag.attrs)) {
      if (value === true) {
        html += ` ${key}`
      } else if (value !== undefined) {
        html += ` ${key}="${value}"`
      }
    }
  }

  html += '>'

  if (typeof tag.children === 'string') {
    html += tag.children
  } else if (Array.isArray(tag.children)) {
    for (const child of tag.children) {
      html += viteHtmlTagTohtmlStr(child)
    }
  }

  html += `</${tag.tag}>`

  return html
}

function isVoidTag(tag: string): boolean {
  return [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
  ].includes(tag)
}
