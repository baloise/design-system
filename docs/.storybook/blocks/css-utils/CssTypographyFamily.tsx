import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssTypographyFamily = ({}) => {
  return CssTable({
    tokens: tokens.font.family,
    css: 'font-family',
    example: item =>  <div className={`font-family-${item.key} text-weight-bold text-align-center p-xx-small`}>Aa</div>,
  })
}
