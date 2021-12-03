# Installation

## Prerequisite

### Setup Angular Project

Create an Angular project with the [Angular CLI](https://cli.angular.io/) and set Sass and ESLint has defaults.

```bash
npm install -g @angular/cli
ng new bal-app --style=scss
cd bal-app
```

Run the app

```bash
ng serve
```

::: tip

- Choose **SCSS** as the stylesheet format, because it gives access to the internal Baloise Design System variables like colors and much more.
- Choose **ESLint** as the default linter tool, because TSLint is deprecated.

To use eslint add the `@angular-eslint/schematics`.

```bash
ng add @angular-eslint/schematics
```

Lets configure eslint rules.
First we need to extend the ESLint rules to improve our linting rules.
Open the `.eslintrc.json` file and add the missing rules.

```json
...
"extends": [
  "eslint:recommended",
  "plugin:@angular-eslint/recommended",
  "plugin:@angular-eslint/template/process-inline-templates",
  "plugin:@typescript-eslint/recommended",
  "plugin:@typescript-eslint/recommended-requiring-type-checking"
],
...
```

:::

::: warning

**WARNING in budgets, maximum exceeded for initial**

Open angular.json file and find budgets keyword and adjust the two values.

```json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "3mb",
    "maximumError": "5mb"
  }
]
```

:::

## Configure Project

Next lets have a look at the `tsconfig.json` file and add the following options.

```json
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    ...
  },
  ...
}
```

Also override the `angularCompilerOptions` at the end of the file.

```json
{
  ...
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
    "compilationMode": "partial"
  }
}
```

## Install Baloise Design System

Use npm to install the Angular proxy library.

```bash
npm install @baloise/design-system-components-angular --save
```

::: tip
We recomand to install our [utility libraries](https://github.com/baloise/web-app-utils) for validations and pipes.

```bash
npm install @baloise/web-app-utils --save
npm install @baloise/web-app-pipes-angular --save
npm install @baloise/web-app-validators-angular --save
```

:::

::: tip
We recommand to use the package `@ngx-translate` for the transalations.

```bash
npm install @ngx-translate/core @ngx-translate/http-loader --save
```

:::

## Install Typography

To apply the Baloise Design System typography follow [the instruction on the page typography documentation](/design/typography.html#install-web-font).

## Install Theming / Styles

To apply the Baloise Design System theming follow [the instruction on the page styling documentation](/components/getting-started/theming.html).

::: warning
Do not forget to apply the style, otherwise you components will not look like in this documentation ;-)
:::

## HTML Structure

Add the `bal-app` to your `app.component.ts` root element. Within this component we are able to use the defined css classes.

```html
...
<bal-app>
  <header>
    <!-- Header content -->
  </header>
  <main class="container">
    <!-- Your application content -->
  </main>
  <bal-footer>
    <!-- Footer content -->
  </bal-footer>
</bal-app>
...
```

::: tip
To have light grey background just add the attribute `background` to the `bal-app` component. Recommended to use with the `bal-card` component.

```xml
<bal-app background>
  <bal-card>
    <!-- Your application content -->
  </bal-card>
</bal-app>
```

:::

## Import the ngModule

Import the `BaloiseDesignSystemModule` and add it to your angular module. To use the custom web components add the schema `CUSTOM_ELEMENTS_SCHEMA` to your root angular module.

### app.module.ts

```typescript{3,9,12}
import { BrowserModule } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BaloisePipeModule } from '@baloise/@baloise/web-app-pipes-angular'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BaloisePipeModule, BaloiseDesignSystemModule.forRoot()],
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
