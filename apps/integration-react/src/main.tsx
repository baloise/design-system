import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Root } from './Root'

import '@helvetia-design/tokens/css/base'
import '@helvetia-design/styles/css/design-system'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
