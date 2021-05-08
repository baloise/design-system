import { HttpClient, HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FormComponent } from './form/form.component'
import { I18nComponent } from './i18n/i18n.component'
import { ModalComponent } from './modal/modal.component'
import { PipesComponent } from './pipes/pipes.component'
import { ServicesComponent } from './services/services.component'

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient)
}

@NgModule({
  declarations: [AppComponent, FormComponent, ServicesComponent, PipesComponent, ModalComponent, I18nComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BaloiseDesignSystemModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'de'])
    translate.setDefaultLang('en')

    const browserLang = translate.getBrowserLang()
    translate.use(browserLang.match(/en|de/) ? browserLang : 'en')
  }
}
