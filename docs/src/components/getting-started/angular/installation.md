# Installation

## Prerequisite

### Setup Angular Project

Create an Angular project with the [Angular CLI](https://cli.angular.io/).

::: tip
Choose **SCSS** as the stylesheet format, because it gives access to the internal Baloise Design System variables like colors and much more.
:::

```bash
npm install -g @angular/cli
ng new bal-app
cd bal-app
ng serve
```

## Install Baloise Design System

Use npm to install the Angular proxy library.

```bash
npm install @baloise/design-system-components-angular ag-grid-community --save
```

::: tip
We recommand to use the package `@ngx-translate` for the transalations.

```bash
npm install @ngx-translate/core @ngx-translate/http-loader --save
```

:::

## Apply styles

To apply the Baloise Design System styles and typography follow the instruction on the page [styling documentation](/components/getting-started/angular/styles.html).

### index.html

Set the css class `bal-app` to the body of the `src/index.html` file.

```xml
<body class="bal-app">
  <app-root></app-root>
</body>
```

::: tip
To have light grey background just add the css class `bal-app-background` to the body. Recommended to use with the `bal-card` component.
:::

## Import the ngModule

Import the `BaloiseDesignSystemModule` and add it to your angular module. To use the custom web components add the schema `CUSTOM_ELEMENTS_SCHEMA` to your root angular module.

### app.module.ts

```typescript{3,9,12}
import { BrowserModule } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BaloiseDesignSystemModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

Now everything is ready to be used. Add some Baloise components and start the app with:

```bash
npm start
```
