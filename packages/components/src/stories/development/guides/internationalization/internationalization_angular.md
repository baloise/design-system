## Initialize

In the Angular framework define them with the module.

```typescript
import { BrowserModule } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BaloiseDesignSystemModule.forRoot({
      defaults: {
        region: 'DE',
        language: 'de',
        allowedLanguages: ['de', 'fr', 'it', 'en'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

## Change on runtime

To change the language or region during run time use the two functions `updateBalLanguage` and `updateBalRegion`.

```typescript
import { Component, OnInit } from '@angular/core'
import { updateBalLanguage, BalSwissLanguage } from '@baloise/design-system-components'

@Component({
  selector: 'app-app-tab-a',
  templateUrl: './app-tab-a.component.html',
  styleUrls: ['./app-tab-a.component.scss'],
})
export class AppTabAComponent {
  changeLang(lang: BalSwissLanguage) {
    updateBalLanguage(lang)
  }
}
```

## Subscribe for changes

To subscribe to changes of the region or language during runtime you can register your callback function using `onBalConfigChange`.

```typescript
import { Component, OnInit } from '@angular/core'
import { onBalConfigChange, BalConfigState } from '@baloise/design-system-components'

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
})
export class SampleComponent implements OnInit {
  constructor(private yourLangService: YourLangService) {}

  ngOnInit(): void {
    // IMPORTANT: register your config update callback in the ngOnInit instead of the constructor
    onBalConfigChange((config: BalConfigState) => {
      // when the language is changed, e.g. in the footer, you probably want to update it in your translations service
      this.yourLangService.changeLanguage(config.language)
    })
  }
}
```
