# Angular

This guide explains how the setup a Angular project with the Baloise UI Library.

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
  imports: [BrowserModule, BalUiLibraryModule],
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
