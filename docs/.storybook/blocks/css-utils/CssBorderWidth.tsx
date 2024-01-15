import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssBorderWidth = ({}) => {
  return CssTable({
    tokens: tokens.size.border.width,
    css: 'border-width',
    example: item => <div className={`border-primary p-small border-width-${item.key}`}></div>,
  })
}
