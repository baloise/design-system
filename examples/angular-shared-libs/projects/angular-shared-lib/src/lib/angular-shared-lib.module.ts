import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'
import { AngularSharedLibComponent } from './angular-shared-lib.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [AngularSharedLibComponent],
  imports: [FormsModule, ReactiveFormsModule, BaloiseDesignSystemModule.forRoot()],
  exports: [AngularSharedLibComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AngularSharedLibModule {}
