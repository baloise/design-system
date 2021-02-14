import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'

import { DIRECTIVES } from './directives/proxies-list'
import { BooleanValueAccessor } from './directives/boolean-value-accessor'
import { TextValueAccessor } from './directives/text-value-accessor'
import { SelectValueAccessor } from './directives/select-value-accessor'
import { FILTERS } from './filters'

import { ToastService } from './toast.service'
import { SnackbarService } from './snackbar.service'

applyPolyfills().then(() => {
  defineCustomElements(window)
})

const DECLARATIONS = [
  // proxies
  ...DIRECTIVES,

  // filters
  ...FILTERS,

  // ngModel accessors
  BooleanValueAccessor,
  TextValueAccessor,
  SelectValueAccessor,
]

@NgModule({
  declarations: [DECLARATIONS],
  exports: [DECLARATIONS],
  imports: [CommonModule, FormsModule],
  providers: [ToastService, SnackbarService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BalUiLibraryModule {}
