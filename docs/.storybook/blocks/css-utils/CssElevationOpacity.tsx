import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssElevationOpacity = ({}) => {
  return CssTable({
    tokens: tokens.opacity,
    css: 'opacity',
    example: item => <div className={`bg-green opacity-${item.key} p-small`}></div>,
  })
}
