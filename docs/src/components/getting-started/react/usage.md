# React Usage

All the Baloise Design System components are registered globally, so just use them in your template like the `BalButton`.

::: tip
More usage examples are in our [React example app](https://github.com/baloise/design-system/tree/master/examples/react).
:::

## Component

After adding the `BaloiseDesignSystem` the components are registerd and can be used directly in your custom react components.

```typescript{2,6}
import React from 'react'
import { BalButton } from '@baloise/design-system-components-react'
import './App.scss'

function MyComponent() {
  return <BalButton>Button</BalButton>
}

export default App
```

## Toast & Snackbar

The Baloise Design System has 2 controllers `balSnackbarController` and `balToastController` to create new notices.
Just import the controllers into the component.

**Components:**

- [Snackbar](/components/components/bal-snackbar.html)
- [Toast](/components/components/bal-toast.html)

```typescript{3,10-12}
import React from 'react'
import { BalButton } from '@baloise/design-system-components-react'
import { balToastController } from '@baloise/design-system-components'
import './App.scss'

function MyComponent() {
  return (
    <BalButton
      onClick={ev =>
        balToastController.create({
          message: 'Message',
        })
      }>
      Button
    </BalButton>
  )
}

export default MyComponent
```

## Filters

In React just import the filter function and use it in the JSX template.

::: tip
More filters are listet here [filters](/components/tooling/filters.html)
:::

```typescript{3,7}
import React from 'react'
import { BalButton } from '@baloise/design-system-components-react'
import { balClaimNumber } from '@baloise/design-system-components'
import './App.scss'

function MyComponent(props) {
  return <span>{balClaimNumber(props.claimNumber)}</span>
}

export default MyComponent
```
