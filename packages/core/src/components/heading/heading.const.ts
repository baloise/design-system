export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span' | 'p'

export const HEADING_TAGS: { [key: string]: HeadingTag } = {
  'display': 'h1',
  'display-2': 'h1',
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'h5': 'h5',
  'span': 'span',
  'p': 'p',
  '5xl': 'h1',
  '4xl': 'h1',
  '3xl': 'h1',
  '2xl': 'h1',
  'xl': 'h2',
  'lg': 'h3',
  'md': 'h4',
  'base': 'h5',
}

export type HeadingSize = '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'base'

export const HEADING_ORDER: HeadingSize[] = ['5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'base']

export const HEADING_SIZES: { [key: string]: HeadingSize } = {
  'display': '5xl',
  'display-2': '4xl',
  'h1': '3xl',
  'h2': '2xl',
  'h3': 'xl',
  'h4': 'lg',
  'h5': 'base',
  'p': 'base',
  'span': 'base',
  '5xl': '5xl',
  '4xl': '4xl',
  '3xl': '3xl',
  '2xl': '2xl',
  'xl': 'xl',
  'lg': 'lg',
  'md': 'md',
  'base': 'base',
}

export type HeadingColor = 'primary' | 'success' | 'warning' | 'danger' | 'white' | ''

export const HEADING_COLORS: { [key: string]: HeadingColor } = {
  primary: 'primary',
  info: 'primary',
  blue: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  white: 'white',
}
