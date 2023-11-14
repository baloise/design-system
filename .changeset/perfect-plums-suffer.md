---
'@baloise/design-system-components-angular': major
'@baloise/design-system-components': major
---

In order to seamlessly integrate with the upgraded Angular 17 version and its default builder, the lazy loading of web components by Stencil is not supported anymore.
As a result, the responsibility for defining these components shifts to Angular.

To be able to still use the lazy-loading by Stencil add `legacy` at the end of the import path. This will only work with webpack builder.

```ts
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular' // default
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular/legacy' // lazy loading of web components by Stencil
```

**Standalone**

Notably, the Angular proxy library introduces support for standalone components.

To use a standalone component, simply include the keyword `standalone` at the end of the import path.

```ts
import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'

import { BalApp, BalTag } from '@baloise/design-system-components-angular/standalone'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BalApp, BalTag],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<bal-app>
    <bal-tag closable color="red">Hello World</bal-tag>
  </bal-app>`,
})
export class AppComponent {}
```

**Auto Invalid Form Controls**

Now by default the Baloise Design System will mark a form control as invalid when it's been touched and is indeed invalid.
To disable this feature, set setInvalid to false in the design system configuration.

```ts
BaloiseDesignSystemModule.forRoot({
  defaults: { ... },
  forms: {
    setInvalid: false, // to deactivate it 
  },
})
```
