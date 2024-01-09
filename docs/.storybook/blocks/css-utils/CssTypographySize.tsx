import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssTypographySize = ({}) => {
  return CssTable({
    tokens: {
      'x-small': tokens.size.text.size['x-small'].desktop,
      'small': tokens.size.text.size['small'].desktop,
      'normal': tokens.size.text.size['normal'].desktop,
      'medium': tokens.size.text.size['medium'].desktop,
      'large': tokens.size.text.size['large'].desktop,
      'x-large': tokens.size.text.size['x-large'].desktop,
      'xx-large': tokens.size.text.size['xx-large'].desktop,
      'xxx-large': tokens.size.text.size['xxx-large'].desktop,
      'xxxx-large': tokens.size.text.size['xxxx-large'].desktop,
      'xxxxx-large': tokens.size.text.size['xxxxx-large'].desktop,
    },
    css: 'is-size',
    example: item => <div className={`is-size-${item.key} has-text-weight-bold has-text-centered p-xx-small`}>Aa</div>,
  })
}
