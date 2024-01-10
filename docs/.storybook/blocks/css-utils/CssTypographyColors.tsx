import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssTypographyColors = ({}) => {
  return CssTable({
    tokens: tokens.color.text,
    css: 'text',
    example: item => <div className={`text-weight-bold text-${item.key} p-small`}>Aa</div>,
  })
}
