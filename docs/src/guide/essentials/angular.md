# Angular

<img style="width: 128px;" src="https://angular.io/assets/images/logos/angular/angular.svg" data-origin="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular">

`@baloise/ui-libary-angular` combines the core Ionic Framework experience with the tooling and APIs that are tailored to Angular Developers.

::: warning
Angular 11.x.x does not support IE11 from scratch. Go to [IE 11 Support](./angular.html#ie-11-support) to get your Angular App IE11 ready.
:::

## Prerequisite

### Setup Angular Project

Create a Angular project with the [Angular CLI](https://cli.angular.io/).

::: tip
Chose **SCSS** as the stylesheet format, because it gives access to the internal Baloise UI Library variables like colors and much more.
:::

```bash
npm install -g @angular/cli
ng new bal-app
cd bal-app
ng serve
```

## Install Baloise UI Library

Use npm to install the Angular proxy library.

```bash
npm install @baloise/ui-library --save
npm install @baloise/ui-library-angular --save
```

### Apply the styles and assets

Go to the [styling documentation](/guide/styles/installation) and add the fonts and styles.

### index.html

Set the css class `bal-app` to the body of the `src/index.html` file.

```xml
<body class="bal-app">
  <app-root></app-root>
</body>
```

::: tip
To have light grey background just add the css class `bal-app-background` to the body. Recommende to use with the `bal-card` component.
:::

## Import the ngModule

Import the `BalUiLibraryModule` and add it to your angular module. To use the custom web components add the schema `CUSTOM_ELEMENTS_SCHEMA` to your root angular module.

### app.module.ts

```typescript
import { BrowserModule } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BalUiLibraryModule } from '@baloise/ui-library-angular'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BalUiLibraryModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

## Usage

In this section shows usage example of the features from UI Library.

::: tip
More usage example are in our Angular example app [Link](https://github.com/baloise/ui-library/tree/master/examples/angular).
:::

### Component

Every Angular component, how uses the components from the UI Library must be declared in a ngModule with the schema `CUSTOM_ELEMENTS_SCHEMA`.

```xml
// app.component.html
<bal-button (click)="onButtonClick()">Button</bal-button>
```

```typescript
// app.component.ts
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  onButtonClick() {
    console.log('onButtonClick')
  }
}
```

### Services

The UI Library has 2 services `BalToastService` and `BalSnackbarService` to create new notices.
Just import the service into the component.

```typescript
// app.component.ts
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public toast: BalToastService) {}

  onButtonClick() {
    this.toast.create({ message: 'Welcome' })
  }
}
```

## IE 11 Support

In this section we will explain how to support Internet Explorer 11 with Angular.

### Step 1 - Targeting ES5

Update the target in the `tsconfig.json` file, because IE11 only support ES5.

```json
"compilerOptions": {
    ...
    "target": "es5"
}
```

### Step 2 - Broswerlist

Replace `not IE 9-11` with the following in the `browserlist` file.

```
not IE 9-10
IE 11
```

### Step 3 - Polyfills

The Baloise UI Library & Angular uses features from ES6+, so we have to install pollyfills to support.
All the pollyfills in Angular are managed in the file `polyfills.ts`. First we need to install the required pollyfils.

```bash
npm install --save classlist.js web-animations-js @webcomponents/custom-elements
```

Near the top of the `polyfills.ts` file add the following polyfills.

```TypeScript
// for browser not supporting custom elements
import '@webcomponents/custom-elements/custom-elements.min.js';
/** For IE 11 */
import 'core-js/es/promise';
import 'core-js/es/string';
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/array';
```

Uncomment the `classlist.js` import.

```TypeScript
/**
 * IE11 requires the following for NgClass support on SVG elements
 */
import 'classlist.js';
```

Uncomment the `web-animations-js` import.

```TypeScript
/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 */
import 'web-animations-js';
```
