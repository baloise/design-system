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

## Usage

### app.component.html

```xml
// app.component.html
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
