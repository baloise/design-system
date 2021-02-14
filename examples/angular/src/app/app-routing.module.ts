import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { I18nComponent } from './i18n/i18n.component';
import { ModalComponent } from './modal/modal.component';
import { PipesComponent } from './pipes/pipes.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: 'form', component: FormComponent, data: { nav: true } },
  { path: 'pipes', component: PipesComponent, data: { nav: true } },
  { path: 'services', component: ServicesComponent, data: { nav: true } },
  { path: 'modal', component: ModalComponent, data: { nav: true } },
  { path: 'i18n', component: I18nComponent, data: { nav: true } },
  { path: '**', redirectTo: '/form' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
