import { MaskBlockOption, MaskValue } from './mask-block-interfaces'
import { I18nKeys } from '../../../interfaces'

export class MaskBlock {
  private _from!: number
  private _to!: number
  private _mask!: MaskValue
  private _isSeparator = false
  private _allowedKeys: string[] = []
  private _format: ((value: string, locale: I18nKeys | string, mask: string) => string) | undefined
  private _locale = 'de-CH'

  constructor(option: Partial<MaskBlockOption>) {
    this._from = option.from || 0
    this._to = option.to || 0
    this._isSeparator = option.isSeparator === undefined ? false : option.isSeparator
    this._mask = option.mask || '_'
    this._allowedKeys = option.allowedKeys ? option.allowedKeys : this.allowedKeys
    this._format = option.format
  }

  public format(value: string): string {
    if (this._format) {
      return this._format(value.replace(this.mask, ''), this._locale, this.mask)
    }
    return value
  }

  get isSeparator(): boolean {
    return this._isSeparator
  }

  get to(): number {
    return this._to
  }

  get from(): number {
    return this._from
  }

  get mask(): string {
    if (typeof this._mask === 'function') {
      return this._mask(this._locale)
    }
    return this._mask
  }

  get allowedKeys(): string[] {
    return this._allowedKeys
  }

  onI18nChange(locale: string) {
    this._locale = locale
  }

  getValueOfTheBlock(value: string): string {
    return value.slice(this._from, this._to)
  }

  isTouched(value: string): boolean {
    const blockValue = this.getValueOfTheBlock(value)
    return !blockValue.split('').every(char => char === this.mask)
  }

  verifyAllowedKeyHits(key: string): boolean {
    if (this.isSeparator && key === this.mask) {
      return true
    } else if (this.allowedKeys.indexOf(key) >= 0) {
      return true
    } else {
      // context.stopPropagation()
      return false
    }
  }
}
