import React from 'react'
import { useBaloiseDesignSystem, BalApp } from '@baloise/ds-react'

import Example from './Example'

export default function App() {
  useBaloiseDesignSystem()

  return (
    <BalApp>
      <main className="container py-large">
        <Example />
      </main>
    </BalApp>
  )
}
