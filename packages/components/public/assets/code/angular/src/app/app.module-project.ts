import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {
  BalButtonModule,
  BalCoreModule,
  BalFooterModule,
  BalHeadingModule,
  BalNavbarModule,
  BalStageModule,
} from '@baloise/design-system-components-angular';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BalCoreModule.forRoot(),
    BalHeadingModule,
    BalButtonModule,
    BalFooterModule,
    BalNavbarModule,
    BalStageModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
