import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssTypographyColors = ({}) => {
  return CssTable({
    tokens: tokens.color.text,
    css: 'has-text',
    example: item => <div className={`has-text-weight-bold has-text-${item.key} p-small`}>Aa</div>,
  })
}
