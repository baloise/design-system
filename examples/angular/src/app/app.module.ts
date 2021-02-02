import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import { BalUiLibraryModule } from '@baloise/ui-library-angular/dist';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BalCheckboxComponent } from './bal-components/bal-checkbox/bal-checkbox.component';
import { BalInputComponent } from './bal-components/bal-input/bal-input.component';
import { BalRadioComponent } from './bal-components/bal-radio/bal-radio.component';
import { BalSelectComponent } from './bal-components/bal-select/bal-select.component';
import { BalDatepickerComponent } from './bal-components/bal-datepicker/bal-datepicker.component';
import { BalTimeinputComponent } from './bal-components/bal-timeinput/bal-timeinput.component';
import { HomeComponent } from './bal-components/home/home.component';
import { BalUiLibraryModule } from './lib';

@NgModule({
  declarations: [AppComponent, BalCheckboxComponent, BalInputComponent, BalRadioComponent, BalSelectComponent, BalDatepickerComponent, BalTimeinputComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BalUiLibraryModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
