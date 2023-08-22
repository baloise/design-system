import { dateSeparator } from '@baloise/web-app-utils'
import { NUMBER_KEYS } from '../../constants/keys.constant'
import { MaskBlock } from '../blocks'
import { AbstractMask } from '../mask'
import { BalDate } from '../../date'
import { MaskClipboardContext, MaskFocusContext } from '../context'
import { I18n } from '../../../interfaces'

export class DateMask extends AbstractMask {
  public maxLength = 10
  public minLength = 10

  private dayMask: I18n<string> = {
    de: 't',
    en: 'd',
    fr: 'j',
    it: 'g',
    nl: 'd',
    es: 'd',
    pl: 'd',
    pt: 'd',
    sv: 'd',
    fi: 'm',
  }

  private monthMask: I18n<string> = {
    de: 'm',
    en: 'm',
    fr: 'm',
    it: 'm',
    nl: 'm',
    es: 'm',
    pl: 'm',
    pt: 'm',
    sv: 'm',
    fi: 'k',
  }

  private yearMask: I18n<string> = {
    de: 'j',
    en: 'y',
    fr: 'a',
    it: 'a',
    nl: 'j',
    es: 'a',
    pl: 'r',
    pt: 'a',
    sv: 'å',
    fi: 'v',
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
        mask: locale => this.dayMask[locale],
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
        mask: locale => this.monthMask[locale],
      }),
      new MaskBlock({ from: 5, to: 6, mask: locale => dateSeparator(locale), isSeparator: true }),
      new MaskBlock({
        from: 6,
        to: 10,
        allowedKeys: [...NUMBER_KEYS],
        mask: locale => this.yearMask[locale],
      }),
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
