---
'@baloise/design-system-components': major
---

The namespaces Props and Events are renamed to BalProps and BalEvents.
As long as the packages `@baloise/design-system-components` is imported into your project
you have direct access to the new namespaces.

#### With Props

**before**

```typescript
import { Props } from '@baloise/design-system-components'

const myColor: Props.BalButtonColor = 'primary'
```

**after**

```typescript
const myColor: BalProps.BalButtonColor = 'primary'
```

#### With Events

**before**

```typescript
import type { Events } from "@baloise/design-system-components"

const onChange = (event: Events.BalAccordionChange) => {
  const myAccordion = event.target // type => EventTarget
  const myDetail = event.detail // type => boolean
  ...
}
```

**after**

```typescript
const onChange = (event: BalEvents.BalAccordionChange) => {
  const myAccordion = event.target // type => HTMLBalAccordion
  const myDetail = event.detail // type => boolean
  ...
}
```

All component types are now located in the component folders `*.interfaces.ts` file.
