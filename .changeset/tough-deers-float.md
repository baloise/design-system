---
'@baloise/ds-core': minor
---

**logo**: add Helvetia brand

Adds support for rendering the Helvetia logo while keeping the Baloise logo as the default. Existing applications continue to show the Baloise logo unless you explicitly switch the brand.

Why: Let consumers decide when to switch their logo without a breaking change.

Usage options

Component-level (single instance):

```html
<!-- Baloise remains the default -->
<bal-logo></bal-logo>

<!-- Opt-in Helvetia logo for a specific instance -->
<bal-logo brand="helvetia"></bal-logo>
```

Global configuration (all instances):

```js
// Set once at startup to switch all logos to Helvetia
BaloiseDesignSystem.config.brand = 'helvetia'

// Omit or set to 'baloise' to keep the default
// BaloiseDesignSystem.config.brand = 'baloise'
```

Angular (provider defaults):

```ts
import { ApplicationConfig } from '@angular/core'
import { provideBaloiseDesignSystem } from '@baloise/ds-angular'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBaloiseDesignSystem({
      defaults: {
        // Switch all logos to Helvetia by default
        brand: 'helvetia',
      },
    })
  ],
}
```

React (hook defaults):

```ts
import { useBaloiseDesignSystem } from '@baloise/ds-react'

function App() {
  useBaloiseDesignSystem({
    defaults: {
      // Switch all logos to Helvetia by default
      brand: 'helvetia',
    },
  })

  return ( /* ... */ )
}
```
