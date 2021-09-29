import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'
// import { BaloiseAngularPipesModule } from '@baloise/web-app-ng-utils'
import { AngularSharedLibModule } from '@baloise/example-angular-shared-lib'
// import { AgGridModule } from 'ag-grid-angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
// import { FormPageComponent } from './pages/form/form-page.component'
// import { TablePageComponent } from './pages/table/table-page.component'
// import { ModalPageComponent } from './pages/modal/modal-page.component'
// import { PipesPageComponent } from './pages/pipes/pipes-page.component'
// import { ServicesPageComponent } from './pages/services/services-page.component'
// import { ModalComponent } from './pages/modal/modal.component'

@NgModule({
  declarations: [
    AppComponent,
    // FormPageComponent,
    // TablePageComponent,
    // ModalPageComponent,
    // ModalComponent,
    // PipesPageComponent,
    // ServicesPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSharedLibModule,
    BaloiseDesignSystemModule.forRoot(),
    // AgGridModule.withComponents([]),
    // BaloiseAngularPipesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
