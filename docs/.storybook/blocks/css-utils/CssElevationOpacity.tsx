import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { CssTable } from './helpers/CssTable'

export const CssElevationOpacity = ({}) => {
  return CssTable({
    tokens: tokens.opacity,
    css: 'has-opacity',
    example: item => <div className={`has-background-green has-opacity-${item.key} p-small`}></div>,
  })
}
