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
  'xxxxx-large': 'h1',
  'xxxx-large': 'h1',
  'xxx-large': 'h1',
  'xx-large': 'h1',
  'x-large': 'h2',
  'large': 'h3',
  'medium': 'h4',
  'normal': 'h5',
}

export type HeadingSize =
  | 'xxxxx-large'
  | 'xxxx-large'
  | 'xxx-large'
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'normal'

export const HEADING_ORDER: HeadingSize[] = [
  'xxxxx-large',
  'xxxx-large',
  'xxx-large',
  'xx-large',
  'x-large',
  'large',
  'medium',
  'normal',
]

export const HEADING_SIZES: { [key: string]: HeadingSize } = {
  'display': 'xxxxx-large',
  'display-2': 'xxxx-large',
  'h1': 'xxx-large',
  'h2': 'xx-large',
  'h3': 'x-large',
  'h4': 'large',
  'h5': 'normal',
  'p': 'normal',
  'span': 'normal',
  'xxxxx-large': 'xxxxx-large',
  'xxxx-large': 'xxxx-large',
  'xxx-large': 'xxx-large',
  'xx-large': 'xx-large',
  'x-large': 'x-large',
  'large': 'large',
  'medium': 'medium',
  'normal': 'normal',
}

export type HeadingColor = 'primary' | 'success' | 'warning' | 'danger' | 'white'

export const HEADING_COLORS: { [key: string]: HeadingColor } = {
  primary: 'primary',
  info: 'primary',
  blue: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  white: 'white',
}
