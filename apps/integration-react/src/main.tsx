import { bootstrapDesignSystem } from '@baloise/ds-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Root } from './Root'

import '@baloise/ds-tokens/css/base'
import '@baloise/ds-styles/css/design-system'

bootstrapDesignSystem({
  defaults: {
    animated: false,
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
