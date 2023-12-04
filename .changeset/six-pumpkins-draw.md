---
'@baloise/design-system-components-angular': minor
---

All components are now available as standalone elements for Angular v17.

Use the `provideBaloiseDesignSystem` provider within the app.config.ts file, where Angular providers are typically defined.

**app.config.ts**

```ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core'

import { provideBaloiseDesignSystem } from '@baloise/design-system-components-angular/standalone'

export const appConfig: ApplicationConfig = {
  providers: [provideBaloiseDesignSystem()],
}
```

In each app component, import the necessary Baloise Design System components or a bundled set.

**app.component.ts**

```ts
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BalApp, BalButton } from '@baloise/design-system-components-angular/standalone'

export interface UpdateControl {
  name: string
  value: any
}

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, BalApp, BalButton],
  template: `
    <bal-app>
      <main class="container py-normal">
        <bal-button>My Button</bal-button>
      </main>
    </bal-app>
  `,
})
export class AppComponent {}
```
