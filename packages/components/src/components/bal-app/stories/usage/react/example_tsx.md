```ts
import React from 'react'
import {
  BalApp,
  BalNavbar,
  BalNavbarBrand,
  BalCard,
  BalCardTitle,
  BalCardSubtitle,
  BalCardContent,
  BalCardActions,
  BalButton,
  BalFooter,
} from '@baloise/design-system-components-react'

export default function Example() {
  return (
    <BalApp className="has-sticky-footer">
      <header className="has-background-white">
        <BalNavbar>
          <BalNavbarBrand>Portal</BalNavbarBrand>
        </BalNavbar>
      </header>
      <main>
        <div className="container">
          <BalCard className="my-large">
            <BalCardTitle>BaloiseCombi</BalCardTitle>
            <BalCardSubtitle>Police number 70/2.937.458</BalCardSubtitle>

            <BalCardContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </BalCardContent>

            <BalCardActions position="right">
              <BalButton>Action</BalButton>
              <BalButton color="info">Action 2</BalButton>
            </BalCardActions>
          </BalCard>
        </div>
      </main>

      <BalFooter></BalFooter>
    </BalApp>
  )
}
```
