import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BooleanValueAccessor } from './generated/boolean-value-accessor'
import { NumericValueAccessor } from './generated/number-value-accessor'
import { SelectValueAccessor } from './generated/select-value-accessor'
import { TextValueAccessor } from './generated/text-value-accessor'

@NgModule({
  declarations: [BooleanValueAccessor, NumericValueAccessor, SelectValueAccessor, TextValueAccessor],
  exports: [BooleanValueAccessor, NumericValueAccessor, SelectValueAccessor, TextValueAccessor],
  imports: [CommonModule],
})
export class BaloiseDesignSystemFormModule {}
