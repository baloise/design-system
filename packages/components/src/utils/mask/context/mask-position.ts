export interface MaskPositionTarget {
  selectionStart: number | null
  selectionEnd: number | null
  value: string
}

export class MaskPosition {
  private _position = 0
  private _positionEnd = 0
  private _isRangeSelection = false
  private target!: MaskPositionTarget

  constructor(target: MaskPositionTarget | null, private isBackspace = false) {
    if (target) {
      this.target = target
      this._position = this.target.selectionStart || 0
      this._positionEnd = this.target.selectionEnd || 0
      this._isRangeSelection = this._position !== this._positionEnd
    }
  }

  get isRangeSelection(): boolean {
    return this._isRangeSelection
  }

  get value(): number {
    if (this.isBackspace) {
      return this._position - 1
    }
    return this._position
  }

  set value(index: number) {
    const validatedIndex = index < 0 ? 0 : index > 10 ? 10 : index
    this._position = validatedIndex
  }

  public toStart() {
    this.value = 0
  }

  public toEnd() {
    this.value = this.target.value.length
  }

  next(next = 1) {
    this._position = this._position + next
    return this._position
  }

  previous(previous = 1) {
    this._position = this._position - previous
    return this._position
  }

  syncToInputElement() {
    this.target.selectionStart = this._position
    this.target.selectionEnd = this._position
  }
}
