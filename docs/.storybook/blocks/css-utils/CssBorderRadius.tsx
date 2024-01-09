import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssBorderRadius = ({}) => {
  return CssTable({
    tokens: tokens.size.radius,
    css: 'has-radius',
    example: item => <div className={`has-background-green has-radius-${item.key} p-small`}></div>,
  })
}
