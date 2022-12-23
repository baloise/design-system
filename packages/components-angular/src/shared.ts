import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BooleanValueAccessor } from './generated/boolean-value-accessor'
import { TextValueAccessor } from './generated/text-value-accessor'
import { SelectValueAccessor } from './generated/select-value-accessor'
import { CheckboxValueAccessor } from './generated/checkbox-value-accessor'
import { NumericValueAccessor } from './generated/number-value-accessor'

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
