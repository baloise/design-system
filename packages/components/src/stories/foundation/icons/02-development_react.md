## Usage

By default the icons are not loaded by the Design System. To import the icons we support two ways.

- Pass the raw SVG content directly to the `bal-icon` component (recommended)
- During the initialization of the Design System

### Import into the component

When importing an SVG into your component you decrease the initial page load. So you use the SVG only where
you needed and at the time you wanted.

First import the bal-icon module and the SVG icon.
Then use it directly with the `bal-icon` component inside your app component.

```tsx
import React from 'react'
import { BalIcon } from '@baloise/design-system-components-react'
import { balIconAccount } from '@baloise/design-system-icons'

export default function Example() {
  return <BalIcon svg={balIconAccount}></BalIcon>
}
```

### Import during initialization

Import the icons form the `@baloise/design-system-icons` package and pass them with
the BalConfig during the initialization.

```typescript
import React from 'react'
import { useBaloiseDesignSystem, BalApp } from '@baloise/design-system-components-react'
import { balIconAccount } from '@baloise/design-system-icons'

export default function App() {
  useBaloiseDesignSystem({
    defaults: {
      icons: { balIconAccount },
    },
  })

  return <BalApp>...</BalApp>
}
```

Then the icon can be found with the name prop of the component. Just remove the prefix `balIcon` and start with a small letter.

```HTML
<bal-icon name="account"></bal-icon>
<bal-icon name="plus"></bal-icon>
```
