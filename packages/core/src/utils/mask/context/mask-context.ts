import { MaskComponent } from '../component'
import { MaskContextEvent, MaskContextOptions } from './mask-context-interfaces'
import { MaskPosition } from './mask-position'
import { hasValueChanged } from '../../form-input'

export abstract class MaskContext<T = MaskContextEvent> {
  private _value = ''
  public position!: MaskPosition
  public component!: MaskComponent

  constructor(protected _options: MaskContextOptions<T>) {
    if (this._options.component && this._options.component.nativeInput) {
      this._value = this._options.component.nativeInput.value
    }
    this.position = new MaskPosition(this._options)
    this.component = this._options.component
  }

  get target(): HTMLInputElement | undefined {
    if (this._options.component && this._options.component.nativeInput) {
      return this._options.component.nativeInput
    }
    return undefined
  }

  get value(): string {
    return this._value
  }

  set value(newValue: string) {
    this._value = newValue
  }

  get focused(): boolean {
    return this._options.component.focused
  }

  isValueEmpty(): boolean {
    return this.value === '' || this.value === undefined || this.value === null
  }

  preventDefault() {
    if (this._options.event.preventDefault) {
      this._options.event.preventDefault()
    }
  }

  stopPropagation() {
    this.preventDefault()
    if (this._options.event.stopPropagation) {
      this._options.event.stopPropagation()
    }
  }

  async submit(eventType: 'input' | 'change' | 'blur' | 'tab' = 'input', parsedValue?: string) {
    if (this.target) {
      this.target.value = this.value
      if (eventType !== 'blur' && eventType !== 'tab') {
        this.position.submit()
      }

      if (this._options.component) {
        if (eventType === 'input' || eventType === 'tab') {
          this._options.component.balInput.emit(this.value)
        }
        if ((eventType === 'change' || eventType === 'blur') && parsedValue !== undefined) {
          if (hasValueChanged(this._options.component.value, parsedValue)) {
            this._options.component.value = parsedValue
            this._options.component.balChange.emit(parsedValue)
          }
        }
      }
    }
  }
}
