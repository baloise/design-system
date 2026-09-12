import { bootstrapDesignSystem } from '@baloise/ds-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Root } from './Root'

import '@baloise/ds-css/css'

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
