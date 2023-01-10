## Integration

Snackbar can be created with the balSnackbarController. The default duration is 5000 milliseconds. The create method return the instance of the created snackbar, so there you can access all the props and methods of it.

```typescript
import { balSnackbarController } from '@baloise/design-system-components'

// Creates and opens a new unique snackbar
const mySnackbar = balSnackbarController.create({
  subject: 'Subject',
  message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  icon: 'info-circle',
})

// Closes the snackbar again
mySnackbar.close()
```
