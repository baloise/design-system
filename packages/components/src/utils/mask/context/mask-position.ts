import { MaskContextOptions } from './mask-context-interfaces'

export interface MaskPositionTarget {
  selectionStart: number | null
  selectionEnd: number | null
  value: string
}

export interface MaskPositionOptions extends MaskContextOptions<any> {
  isBackspace?: boolean
}

export class MaskPosition {
  private _position = 0
  private _positionEnd = 0
  private _isRangeSelection = false

  constructor(protected _options: MaskPositionOptions) {
    if (_options.component && _options.component.nativeInput) {
      this._position = _options.component.nativeInput.selectionStart || 0
      this._positionEnd = _options.component.nativeInput.selectionEnd || 0
      this._isRangeSelection = this._position !== this._positionEnd
    }
  }

  get isRangeSelection(): boolean {
    return this._isRangeSelection
  }

  get value(): number {
    if (this._options.isBackspace && this._position > 0) {
      return this._position - 1
    }
    return this._position
  }

  set value(index: number) {
    const validatedIndex = index < 0 ? 0 : index > this._options.mask.maxLength ? this._options.mask.maxLength : index
    this._position = validatedIndex
  }

  public toStart() {
    this.value = 0
  }

  public toEnd() {
    const target = this.getTarget()
    if (target) {
      this.value = target.value.length
    }
  }

  next(next = 1) {
    const newPosition = this._position + next
    if (newPosition <= this._options.mask.maxLength) {
      this._position = newPosition
    }
    return this._position
  }

  previous(previous = 1) {
    const newPosition = this._position - previous
    if (newPosition >= 0) {
      this._position = newPosition
    } else {
      this._position = 0
    }
    return this._position
  }

  submit() {
    const target = this.getTarget()
    if (target) {
      target.selectionStart = this._position
      target.selectionEnd = this._position
    }
  }

  private getTarget() {
    if (this._options.component && this._options.component.nativeInput) {
      return this._options.component.nativeInput
    }
    return undefined
  }
}
