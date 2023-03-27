---
'@baloise/design-system-components': major
---

Property and event types are global types and available with `BalProps` or `BalEvents`.
The target of the event is now also defined.

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
