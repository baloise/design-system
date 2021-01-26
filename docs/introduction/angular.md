# Angular

To add the Baloise UI Library to your Angular project follow this steps.

## Install

After creating a project with ng-cli install the following libraries.

> We recommand to use **Sass** for styling in the Vue project to get access to the color variables and responsive helpers.

```bash
npm install @baloise/ui-library --save
npm install @baloise/ui-library-angular --save
```

## Add Module

Import the `BalUiLibraryModule` and add it to your angular module. To use the custom web components add the schema `CUSTOM_ELEMENTS_SCHEMA` to your root angular module.

### app.module.ts

```typescript
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

## Styles

> Please follow the styling guide to add the Baloise UI Library styling. [Go to styling](introduction/styling.md)

## Usage

> More usage example are in our Angular example app [Link](https://github.com/baloise/ui-library/tree/master/examples/angular).

### app.component.html

```xml
<div class="container">
    <h1>Checkbox</h1>
    <bal-checkbox label="Label" data-test-id="checkbox-normal" [(ngModel)]="checkbox"></bal-checkbox>
    <br>
    <bal-text>Checked: {{ checkbox }}</bal-text>
</div>
```

### app.component.ts

```typescript
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-bal-checkbox',
  templateUrl: './bal-checkbox.component.html',
})
export class BalCheckboxComponent implements OnInit {
  checkbox: boolean = false

  constructor() {}

  ngOnInit(): void {}
}
```
