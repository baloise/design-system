import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { defineCustomElements } from '@baloise/ui-library/loader'

import { DIRECTIVES } from './directives/proxies-list'
import { BooleanValueAccessor } from './directives/boolean-value-accessor'
import { TextValueAccessor } from './directives/text-value-accessor'
import { SelectValueAccessor } from './directives/select-value-accessor'
import { FILTERS } from './filters'

defineCustomElements(window)

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
  providers: [],
})
export class BalUiLibraryModule {}
