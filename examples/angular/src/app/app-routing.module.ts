import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FormPageComponent } from './pages/form/form-page.component'
import { TablePageComponent } from './pages/table/table-page.component'
import { ModalPageComponent } from './pages/modal/modal-page.component'
import { PipesPageComponent } from './pages/pipes/pipes-page.component'
import { ServicesPageComponent } from './pages/services/services-page.component'

const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: 'form', component: FormPageComponent, data: { nav: true } },
  { path: 'table', component: TablePageComponent, data: { nav: true } },
  { path: 'modal', component: ModalPageComponent, data: { nav: true } },
  { path: 'pipes', component: PipesPageComponent, data: { nav: true } },
  { path: 'services', component: ServicesPageComponent, data: { nav: true } },
  { path: '**', redirectTo: '/form' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
