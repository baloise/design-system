import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssTypographyFamily = ({}) => {
  return CssTable({
    tokens: tokens.font.family,
    css: 'is-family',
    example: item =>  <div className={`is-family-${item.key} has-text-weight-bold has-text-centered p-xx-small`}>Aa</div>,
  })
}
