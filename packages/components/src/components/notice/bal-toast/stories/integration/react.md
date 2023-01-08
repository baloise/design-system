## Integration React

Toast can be created with the `balToastController`. The default duration is 5000 milliseconds.
The `create` method return the instance of the created toast, so there you can access all the props and methods of it.

```tsx
import React from 'react'
import { BalButton } from '@baloise/design-system-components-react'
import { balToastController } from '@baloise/design-system-components'

function MyComponent() {
  return (
    <BalButton
      onClick={ev =>
        balToastController.create({
          message: 'Message',
        })
      }
    ></BalButton>
  )
}

export default MyComponent
```
