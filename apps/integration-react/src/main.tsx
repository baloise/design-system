import { bootstrapDesignSystem } from '@baloise/ds-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'

import '@baloise/ds-css/css'

bootstrapDesignSystem()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
