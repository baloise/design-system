import { dateSeparator } from '@baloise/web-app-utils'
import { NUMBER_KEYS } from '../../constants/keys.constant'
import { MaskBlock } from '../mask-block'
import { Mask } from '../mask'
import { OnFormatValue, OnPaste } from '../mask-interfaces'
import { MaskClipboardContext, MaskFocusContext } from '../context'
import { BalDate } from '../../date'

export class DateMask extends Mask implements OnPaste, OnFormatValue {
  constructor() {
    super([
      new MaskBlock({ from: 0, to: 2, allowedKeys: [...NUMBER_KEYS], format: value => value.padStart(2, '0') }),
      new MaskBlock({ from: 2, to: 3, mask: locale => dateSeparator(locale), isSeparator: true }),
      new MaskBlock({ from: 3, to: 5, allowedKeys: [...NUMBER_KEYS], format: value => value.padStart(2, '0') }),
      new MaskBlock({ from: 5, to: 6, mask: locale => dateSeparator(locale), isSeparator: true }),
      new MaskBlock({ from: 6, to: 10, allowedKeys: [...NUMBER_KEYS] }),
    ])
  }

  override onPaste(context: MaskClipboardContext, _block: MaskBlock, _index: number): void {
    const value = context.clipboardData || ''
    const date = BalDate.fromAnyFormat(value)

    if (date.isValid) {
      context.value = date.toFormat()
      context.position.toEnd()
      context.position.syncToInputElement()
    }
  }

  override onFormatValue(context: MaskFocusContext) {
    const rawValue = this.getRawValueWithoutMask(context)
    const date = BalDate.fromAnyFormat(rawValue)
    if (date.isValid) {
      context.target.value = date.toFormat()
    }
  }
}
