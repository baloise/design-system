import parse from 'html-react-parser'

export const html = (content: string) => parse(content.replace('v-bind="args"', ''), { trim: true })
