import isFunction from 'lodash.isfunction'

export type MaskValueFn = (locale: string) => string
export type MaskValue = string | MaskValueFn

export interface MaskBlockOption {
  from: number
  to: number
  isSeparator: boolean
  mask: MaskValue
  allowedKeys: string[]
  format: (value: string) => string
}

export class MaskBlock {
  private _from!: number
  private _to!: number
  private _mask!: MaskValue
  private _isSeparator = false
  private _allowedKeys: string[] = []
  private _format: ((value: string, locale: string) => string) | undefined
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
      return this._format(value.replace(this.mask, ''), this._locale)
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
    if (isFunction(this._mask)) {
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

  sliceFromValue(value: string): string {
    return value.slice(this._from, this._to)
  }

  isTouched(value: string): boolean {
    const blockValue = this.sliceFromValue(value)
    return !blockValue.split('').every(char => char === this.mask)
  }
}
