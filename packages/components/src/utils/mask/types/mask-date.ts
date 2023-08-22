import { dateSeparator } from '@baloise/web-app-utils'
import { NUMBER_KEYS } from '../../constants/keys.constant'
import { MaskBlock } from '../blocks'
import { AbstractMask } from '../mask'
import { BalDate } from '../../date'
import { MaskClipboardContext, MaskFocusContext } from '../context'

export class DateMask extends AbstractMask {
  public maxLength = 10
  public minLength = 10

  constructor() {
    super([
      new MaskBlock({
        from: 0,
        to: 2,
        allowedKeys: [...NUMBER_KEYS],
        format: (value, _locale, mask) => {
          if (Number.isNaN(parseInt(value, 10))) {
            return `${mask}${mask}`
          }
          return value.padStart(2, '0')
        },
        mask: 'D',
      }),
      new MaskBlock({ from: 2, to: 3, mask: locale => dateSeparator(locale), isSeparator: true }),
      new MaskBlock({
        from: 3,
        to: 5,
        allowedKeys: [...NUMBER_KEYS],
        format: (value, _locale, mask) => {
          if (Number.isNaN(parseInt(value, 10))) {
            return `${mask}${mask}`
          }
          return value.padStart(2, '0')
        },
        mask: 'M',
      }),
      new MaskBlock({ from: 5, to: 6, mask: locale => dateSeparator(locale), isSeparator: true }),
      new MaskBlock({ from: 6, to: 10, allowedKeys: [...NUMBER_KEYS], mask: 'Y' }),
    ])
  }

  override onParseValue(inputValue?: string): string {
    if (inputValue) {
      const date = BalDate.fromAnyFormat(this.blocks.getRawValueWithoutMask(inputValue))
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
    }
  }

  override onBlur(context: MaskFocusContext) {
    const rawValue = this.blocks.getRawValueWithoutMaskByContext(context)
    const date = BalDate.fromAnyFormat(rawValue)
    if (date.isValid) {
      const formattedDate = date.toFormat()
      if (formattedDate !== context.value) {
        context.value = formattedDate
      }
    }
  }
}
