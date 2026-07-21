import { dateSeparator } from '../../date'
import { NUMBER_KEYS } from '../../constants/keys.constant'
import { MaskBlock } from '../blocks'
import { AbstractMask } from '../mask'
import { BalDate } from '../../date'
import { MaskClipboardContext, MaskFocusContext } from '../context'
import { I18n, I18nKeys } from '../../../interfaces'
import { INVALID_VALUE } from '../mask-util'

export class DateMask extends AbstractMask {
  public maxLength = 10
  public minLength = 10
  public inputMode: BalProps.BalInputInputMode = 'decimal'

  private dayMask: I18n<string> = {
    de: 'T',
    en: 'D',
    fr: 'J',
    it: 'G',
    nl: 'D',
    es: 'D',
    pl: 'D',
    pt: 'D',
    sv: 'D',
    fi: 'M',
  }

  private monthMask: I18n<string> = {
    de: 'M',
    en: 'M',
    fr: 'M',
    it: 'M',
    nl: 'M',
    es: 'M',
    pl: 'M',
    pt: 'M',
    sv: 'M',
    fi: 'K',
  }

  private yearMask: I18n<string> = {
    de: 'J',
    en: 'Y',
    fr: 'A',
    it: 'A',
    nl: 'J',
    es: 'A',
    pl: 'R',
    pt: 'A',
    sv: 'Å',
    fi: 'V',
  }

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
        mask: locale => {
          return this.dayMask[locale.split('-')[0] as I18nKeys] || this.dayMask['de']
        },
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
        mask: locale => this.monthMask[locale.split('-')[0] as I18nKeys] || this.monthMask['de'],
      }),
      new MaskBlock({ from: 5, to: 6, mask: locale => dateSeparator(locale), isSeparator: true }),
      new MaskBlock({
        from: 6,
        to: 10,
        allowedKeys: [...NUMBER_KEYS],
        mask: locale => this.yearMask[locale.split('-')[0] as I18nKeys] || this.yearMask['de'],
      }),
    ])
  }

  override onParseValue(
    inputValue?: string,
    options: { allowInvalidValue: boolean } = { allowInvalidValue: false },
  ): string {
    if (inputValue) {
      const date = BalDate.fromAnyFormat(this.blocks.getRawValueWithoutMask(inputValue))
      if (date.isValid) {
        return date.toISODate()
      } else if (options && options.allowInvalidValue) {
        return INVALID_VALUE
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
    } else if (context.component.allowInvalidValue) {
      if (rawValue !== context.value) {
        context.value = rawValue
      }
    }
  }
}
