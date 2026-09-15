import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Root } from './Root'

import '@baloise/ds-tokens/css/base'
import '@baloise/ds-styles/css/design-system'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
