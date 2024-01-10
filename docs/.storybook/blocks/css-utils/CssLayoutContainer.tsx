import React from 'react'
import { CssTable } from './helpers/CssTable'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssLayoutContainer = ({}) => {
  return CssTable({
    tokens: tokens.size.container.size,
    css: 'container is',
  })
}
