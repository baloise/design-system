import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalCheckboxComponent } from './bal-components/bal-checkbox/bal-checkbox.component';
import { BalInputComponent } from './bal-components/bal-input/bal-input.component';
import { BalRadioComponent } from './bal-components/bal-radio/bal-radio.component';
import { BalSelectComponent } from './bal-components/bal-select/bal-select.component';
import { BalDatepickerComponent } from './bal-components/bal-datepicker/bal-datepicker.component';
import { BalTimeinputComponent } from './bal-components/bal-timeinput/bal-timeinput.component';
import { BalComponentsComponent } from './bal-components/bal-components.component';

const routes: Routes = [
  {path: '', component: BalComponentsComponent},
  {path: 'checkbox', component: BalCheckboxComponent},
  {path: 'input', component: BalInputComponent},
  {path: 'radio', component: BalRadioComponent},
  {path: 'select', component: BalSelectComponent},
  {path: 'datepicker', component: BalDatepickerComponent},
  {path: 'timeinput', component: BalTimeinputComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
