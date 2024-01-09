import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssBorderColors = ({}) => {
  return CssTable({
    tokens: tokens.color.border,
    // list,
    css: 'has-border',
    example: item => <div className={`has-border-${item.key} p-small`}></div>,
  })
}
