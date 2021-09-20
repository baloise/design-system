import React from 'react'
import { BalApp, BalButton, BalCard, BalCardContent } from '@baloise/design-system-components-react'
import './App.scss'

function App() {
  return (
    <BalApp background>
      <main className="container">
        <BalCard className="mt-6">
          <BalCardContent>
            <BalButton>Button</BalButton>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates nesciunt facilis ex animi molestiae
              harum cupiditate aliquid corrupti blanditiis voluptas? Omnis voluptate necessitatibus adipisci esse
              voluptatibus debitis officia ipsam vero.
            </p>
          </BalCardContent>
        </BalCard>
      </main>
    </BalApp>
  )
}

export default App
