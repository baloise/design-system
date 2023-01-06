## Integration

Toast can be created with the `balToastController`. The default duration is 5000 milliseconds.
The `create` method return the instance of the created toast, so there you can access all the props and methods of it.

```typescript
import { balToastController } from '@baloise/design-system-components'

balToastController.create({ message: 'Hi I am a default Toast!', duration: 1000 })
balToastController.create({ message: 'Warning!', color: 'warning' })

const myToast = balToastController.create({ message: 'Danger zone!', color: 'danger' })
myToast.close()
```