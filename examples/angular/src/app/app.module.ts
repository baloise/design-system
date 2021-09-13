import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
// import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'
import { AgGridModule } from 'ag-grid-angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FormPageComponent } from './pages/form/form-page.component'
import { TablePageComponent } from './pages/table/table-page.component'
import { ModalPageComponent } from './pages/modal/modal-page.component'
import { PipesPageComponent } from './pages/pipes/pipes-page.component'
import { ServicesPageComponent } from './pages/services/services-page.component'

@NgModule({
  declarations: [
    AppComponent,
    FormPageComponent,
    TablePageComponent,
    ModalPageComponent,
    PipesPageComponent,
    ServicesPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BaloiseDesignSystemModule.forRoot(),
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
