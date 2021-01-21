# Angular

> Do not forget to configure fonts and styling. [Go to styling](introduction/styling.md)

## Install

After creating a project with ng-cli install the following libraries.

```bash
npm install @baloise/ui-library --save
npm install @baloise/ui-library-angular --save
```

## Add Module

Import the `BalUiLibraryModule` and add it to your angular module. To use the custom web components add the schema `CUSTOM_ELEMENTS_SCHEMA` to your root angular module.

```typescript
// app.module.ts
import { BrowserModule } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BalUiLibraryModule } from '@baloise/ui-library-angular/dist'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BalUiLibraryModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```
