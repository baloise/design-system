import parse from 'html-react-parser'
import { html_beautify } from 'js-beautify/js/lib/beautify-html'

export const html = (content: string) => parse(content.replace('v-bind="args"', ''), { trim: true })

export const htmlBeautify = (content: string) => html_beautify(content)
