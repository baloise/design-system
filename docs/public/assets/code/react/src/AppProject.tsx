import React from 'react'
import {
  useBaloiseDesignSystem,
  BalApp,
  BalNavbar,
  BalNavbarBrand,
  BalStage,
  BalStageBody,
  BalHeading,
  BalButton,
  BalFooter,
} from '@baloise/ds-react'

export default function App() {
  useBaloiseDesignSystem()

  return (
    <BalApp className="has-sticky-footer">
      <header>
        <BalNavbar>
          <BalNavbarBrand href="/" target="_blank">
            Design System
          </BalNavbarBrand>
        </BalNavbar>
      </header>
      <BalStage color="green" size="small">
        <BalStageBody>
          <BalHeading>Welcome to the</BalHeading>
          <BalHeading subtitle>Baloise Design System</BalHeading>
        </BalStageBody>
      </BalStage>
      <main className="container mt-xx-large">
        <p>
          The Baloise Design System consists of UI components and a clearly defined visual style, released as both code
          implementations and design artifacts to build any number of web applications.
        </p>
        <BalButton href="https://design.baloise.dev" target="_blank">
          Check out the Documentation
        </BalButton>
      </main>
      <BalFooter></BalFooter>
    </BalApp>
  )
}
