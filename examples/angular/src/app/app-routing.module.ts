import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalCheckboxComponent } from './bal-components/bal-checkbox/bal-checkbox.component';
import { BalInputComponent } from './bal-components/bal-input/bal-input.component';
import { BalRadioComponent } from './bal-components/bal-radio/bal-radio.component';
import { BalSelectComponent } from './bal-components/bal-select/bal-select.component';
import { BalDatepickerComponent } from './bal-components/bal-datepicker/bal-datepicker.component';
import { BalTimeinputComponent } from './bal-components/bal-timeinput/bal-timeinput.component';
import { HomeComponent } from './bal-components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'checkbox', component: BalCheckboxComponent},
  {path: 'radio', component: BalRadioComponent},
  {path: 'input', component: BalInputComponent},
  {path: 'datepicker', component: BalDatepickerComponent},
  {path: 'select', component: BalSelectComponent},
  {path: 'timeinput', component: BalTimeinputComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
