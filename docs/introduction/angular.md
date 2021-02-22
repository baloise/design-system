# Angular

This guide explains how the setup a Angular project with the Baloise UI Library.

> Angular 11.x.x does not support IE11 from scratch. Go to [IE 11 Support](IE-11-Support) to get your Angular App IE11 ready.

## Prerequisite

### Setup Angular Project

Create a Angular project with the [Angular CLI](https://cli.angular.io/).

> Use **SCSS** as the stylesheet format.

```bash
npm install -g @angular/cli
ng new bal-app
cd bal-app
ng serve
```

## Install Baloise UI Library

Use npm to install the Angular proxy library.

```bash
npm install @baloise/ui-library-angular --save
```

### Stylesheet

Import the UI Library styles into the main Angular Sass file `src/styles.scss`.

```scss
@import 'node_modules/@baloise/ui-library/src/styles/ui-library.scss';
```

### index.html

Set the css class `bal-app` to the body of the `src/index.html` file.

```xml
<body class="bal-app">
  <app-root></app-root>
</body>
```

> To have light grey background just add the css class `bal-app-background` to the body. Recommende to use with the `bal-card` component.

### Assets

Download the 2 used fonts of our Baloise style guide.

- MetaStd-Normal
  - [woff2](https://github.com/baloise/ui-library/raw/master/packages/library/src/assets/fonts/MetaStd-Medium.woff2)
  - [woff](https://github.com/baloise/ui-library/raw/master/packages/library/src/assets/fonts/MetaStd-Normal.woff)
  - [truetype](https://github.com/baloise/ui-library/raw/master/packages/library/src/assets/fonts/MetaStd-Normal.ttf)
- MetaStd-Medium
  - [woff2](https://github.com/baloise/ui-library/raw/master/packages/library/src/assets/fonts/MetaStd-Medium.woff2)
  - [woff](https://github.com/baloise/ui-library/raw/master/packages/library/src/assets/fonts/MetaStd-Medium.woff)
  - [truetype](https://github.com/baloise/ui-library/raw/master/packages/library/src/assets/fonts/MetaStd-Medium.ttf)

Create a folders `fonts` in the `src/assets` folder and place the donwloaded fonts in there.
To use the fonts in the css styles import it with the following snippet.

## Add Module

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

> More usage example are in our Angular example app [Link](https://github.com/baloise/ui-library/tree/master/examples/angular).

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

### Pipes

The UI Library has a collection of [pipes/filters](utilities/filters).

In our example we want that `baloise` gets turned into `Baloise`. To do so we use the pipe `balCapitalize` in our component template file.

```xml
// app.component.html
{{ 'baloise' | balCapitalize }}
```

The filters can also be used in the component controller files like this.

```typescript
// app.component.ts
import { Component } from '@angular/core'
import { balCapitalize } from '@baloise/ui-library'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  capitalize(value: string) {
    return balCapitalize(value)
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
