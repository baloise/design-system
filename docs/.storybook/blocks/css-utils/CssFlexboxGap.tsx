import React from 'react'
import { CssTable } from './helpers/CssTable'

import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssFlexboxGap = ({}) => {
  return CssTable({
    tokens: { auto: tokens.space.auto, ...tokens.size.space, tablet: {}, desktop: {} },
    css: 'fg',
    example: item => <div className={`has-background-${item.key} p-small`}></div>,
  })
}
