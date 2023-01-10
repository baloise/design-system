## Integration React

Snackbar can be created with the balSnackbarController. The default duration is 5000 milliseconds. The create method return the instance of the created snackbar, so there you can access all the props and methods of it.

```tsx
import React from 'react'
import { BalButton } from '@baloise/design-system-components-react'
import { balSnackbarController } from '@baloise/design-system-components'

function MyComponent() {
  return (
    <BalButton
      onClick={ev =>
        balSnackbarController.create({
          subject: 'Subject',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
          icon: 'info-circle',
        })
      }
    ></BalButton>
  )
}

export default MyComponent
```
