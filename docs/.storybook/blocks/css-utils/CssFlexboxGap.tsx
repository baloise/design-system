import React from 'react'
import { CssTable } from './helpers/CssTable'

import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const CssFlexboxGap = ({}) => {
  return CssTable({
    tokens: { auto: tokens.space.auto, ...tokens.size.space, tablet: {}, desktop: {} },
    css: 'gap',
    example: item => (
      <div className={`bg-red`} style={{ height: `var(--bal-space-${item.key})`, width: `var(--bal-space-${item.key})` }}></div>
    ),
  })
}
