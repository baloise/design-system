import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BooleanValueAccessor } from './directives/boolean-value-accessor'
import { TextValueAccessor } from './directives/text-value-accessor'
import { SelectValueAccessor } from './directives/select-value-accessor'
import { CheckboxValueAccessor } from './directives/checkbox-accessor'
import { NumericValueAccessor } from './directives/number-value-accessor'

import { AutoFocus } from './focus.directive'

const DECLARATIONS = [
  // directives
  AutoFocus,

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
