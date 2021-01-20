# Angular

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

## Advanced Styling (SASS)

Instead of importing the `ui-library.css` file, use the `ui-library.scss` SASS file in the main `.scss` file.

```scss
// Imports all the global styles of the library
@import 'node_modules/@baloise/ui-library/src/styles/ui-library.scss';
```

This gives access to the scss variables like [colors](essentials/colors.md) or [responsiveness helpers](essentials/responsiveness).

> Use the variables of the UI-Library for your own project components by using the `ui-library.utilities.scss` file.

```scss
// Only imports variables and mixins
@import 'node_modules/@baloise/ui-library/src/styles/ui-library.utilities.scss';
```
