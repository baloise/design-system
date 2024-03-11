import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { BaloiseDesignSystemModule } from '@baloise/ds-angular'

import { AppComponent } from './app.component'
import { ExampleComponent } from './example.component'

@NgModule({
  imports: [BrowserModule, FormsModule, BaloiseDesignSystemModule.forRoot(), ExampleComponent],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
