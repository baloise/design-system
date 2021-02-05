import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BalCheckboxComponent } from "./bal-components/bal-checkbox/bal-checkbox.component";
import { BalInputComponent } from "./bal-components/bal-input/bal-input.component";
import { BalRadioComponent } from "./bal-components/bal-radio/bal-radio.component";
import { BalSelectComponent } from "./bal-components/bal-select/bal-select.component";
import { BalDatepickerComponent } from "./bal-components/bal-datepicker/bal-datepicker.component";
import { BalTimeinputComponent } from "./bal-components/bal-timeinput/bal-timeinput.component";
import { HomeComponent } from "./bal-components/home/home.component";
import { BalModalComponent } from "./bal-components/bal-modal/bal-modal.component";
import { BalToastComponent } from "./bal-components/bal-toast/bal-toast.component";

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full" },
  {path: "home", component: HomeComponent, data: { nav: true}},
  {path: "checkbox", component: BalCheckboxComponent, data: { nav: true}},
  {path: "radio", component: BalRadioComponent, data: { nav: true}},
  {path: "input", component: BalInputComponent, data: { nav: true}},
  {path: "datepicker", component: BalDatepickerComponent, data: { nav: true}},
  {path: "select", component: BalSelectComponent, data: { nav: true}},
  {path: "timeinput", component: BalTimeinputComponent, data: { nav: true}},
  {path: "toast", component: BalToastComponent, data: { nav: true}},
  {path: "modal", component: BalModalComponent, data: { nav: true}},
  {path: "**", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
