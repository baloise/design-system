import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssBackgroundColors = ({}) => {
  return CssTable({
    tokens: tokens.color.background,
    css: 'bg',
    example: item => <div className={`bg-${item.key} p-small`}></div>,
  })
}
