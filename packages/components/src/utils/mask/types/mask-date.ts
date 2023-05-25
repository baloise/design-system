import { dateSeparator } from '@baloise/web-app-utils'
import { NUMBER_KEYS } from '../../constants/keys.constant'
import { MaskBlock } from '../mask-block'
import { AbstractMask } from '../mask'
import { OnBlur, OnFormatValue, OnPaste } from '../mask-interfaces'
import { MaskClipboardContext, MaskFocusContext } from '../context'
import { BalDate } from '../../date'

export class DateMask extends AbstractMask implements OnPaste, OnBlur, OnFormatValue {
  maxLength = 10
  minLength = 10

  constructor() {
    super([
      new MaskBlock({ from: 0, to: 2, allowedKeys: [...NUMBER_KEYS], format: value => value.padStart(2, '0') }),
      new MaskBlock({ from: 2, to: 3, mask: locale => dateSeparator(locale), isSeparator: true }),
      new MaskBlock({ from: 3, to: 5, allowedKeys: [...NUMBER_KEYS], format: value => value.padStart(2, '0') }),
      new MaskBlock({ from: 5, to: 6, mask: locale => dateSeparator(locale), isSeparator: true }),
      new MaskBlock({ from: 6, to: 10, allowedKeys: [...NUMBER_KEYS] }),
    ])
  }

  override onParseValue(inputValue?: string): string {
    if (inputValue) {
      const date = BalDate.fromAnyFormat(inputValue)
      if (date.isValid) {
        return date.toISODate()
      }
    }
    return ''
  }

  override onFormatValue(isoDate?: string): string {
    if (isoDate) {
      const date = BalDate.fromISO(isoDate)
      if (date.isValid) {
        return date.toFormat()
      }
    }
    return ''
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

  override onBlur(context: MaskFocusContext) {
    const rawValue = this.getRawValueWithoutMaskByContext(context)
    const date = BalDate.fromAnyFormat(rawValue)
    if (date.isValid) {
      const formattedDate = date.toFormat()
      if (formattedDate !== context.target.value) {
        context.target.value = formattedDate
        this.onInput(formattedDate)
      }
    }
  }
}
