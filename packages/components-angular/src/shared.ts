import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BooleanValueAccessor } from './directives/boolean-value-accessor'
import { TextValueAccessor } from './directives/text-value-accessor'
import { SelectValueAccessor } from './directives/select-value-accessor'
import { CheckboxValueAccessor } from './directives/checkbox-value-accessor'
import { NumericValueAccessor } from './directives/number-value-accessor'

import { BalAutoFocus } from './focus.directive'

const DECLARATIONS = [
  // directives
  BalAutoFocus,

  // ngModel accessors
  CheckboxValueAccessor,
  BooleanValueAccessor,
  TextValueAccessor,
  SelectValueAccessor,
  NumericValueAccessor,
]

@NgModule({
  declarations: [DECLARATIONS],
  exports: [DECLARATIONS, CommonModule],
  imports: [CommonModule],
})
export class BalSharedModule {}
