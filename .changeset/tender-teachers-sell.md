---
'@baloise/design-system-components-angular': major
---

Remove Angular component modules, because of Zone.js optimization.
Tree-shaking is given by stencil and therefor to have Angular component modules
does not have any advantages anymore.

**before**

```typescript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { BalCoreModule, BalHeadingModule, BalButtonModule } from '@baloise/design-system-components-angular'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BalCoreModule.forRoot(), BalHeadingModule, BalButtonModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

**after**

Import the new module `BaloiseDesignSystemModule`, which adds all the components. 
After remove all old component modules like `BalButtonModule` from your project.

```typescript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BaloiseDesignSystemModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```
