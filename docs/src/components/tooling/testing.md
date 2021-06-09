# Testing

## Prerequisites

For E-2-E testing we are using the testing framework [Cypress](https://www.cypress.io/), so for that we have to install it first.

::: tip
If you are using Vue or Angular please install Cypress with the provided CLI.
:::

## Install Accessors

Install the library directly from npm.

```bash
npm add @baloise/design-system-testing
```

## Usage

Further documentations for each component accessor is documented on the components page.

```typescript
import { dataTestSelector, ButtonAccessor } from '@baloise/design-system-testing'

describe('Button', () => {
  it('should ...', () => {
    const button = ButtonAccessor(dataTestSelector('button-id')).get()
    button.click()
    button.contains('Label')
  })
})
```
