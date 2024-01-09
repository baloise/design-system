import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssTypographyWeight = ({}) => {
  return CssTable({
    tokens: tokens.size.text.weight,
    css: 'has-text-weight',
    example: item => <div className={`has-text-weight-${item.key} p-small`}></div>,
  })
}
