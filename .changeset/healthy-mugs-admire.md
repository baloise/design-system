---
'@baloise/design-system-components': major
---

The namespaces Props and Events are renamed to BalProps and BalEvents.
As long as the packages `@baloise/design-system-components` is imported into your project
you have direct access to the new namespaces.

**before**

```typescript
import { Props } from '@baloise/design-system-components'

const myColor: Props.BalButtonColor = 'primary'
```

**after**

```typescript
const myColor: BalProps.BalButtonColor = 'primary'
```

All component types are now located in the component folders `*.interfaces.ts` file.
