export class DateMaskPosition {
  private _position = 0

  constructor(private target: HTMLInputElement) {
    this._position = this.target.selectionStart || 0
  }

  isNumber(position = this._position) {
    return [0, 1, 3, 4, 6, 7, 8, 9].includes(position)
  }

  isSeparator(position = this._position) {
    return [2, 5].includes(position)
  }

  get value(): number {
    return this._position
  }

  set value(index: number) {
    const validatedIndex = index < 0 ? 0 : index > 10 ? 10 : index
    this._position = validatedIndex
  }

  next(next = 1) {
    this._position = this._position + next
  }

  previous(previous = 1) {
    this._position = this._position - previous
  }

  syncToInputElement() {
    this.target.selectionStart = this._position
    this.target.selectionEnd = this._position
  }
}
