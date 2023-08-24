import { BalConfigState } from '../../config'
import {
  MaskClipboardContext,
  MaskFocusContext,
  MaskKeyboardContext,
  MaskLocaleContext,
  MaskMouseContext,
  MaskValueChangedContext,
} from '../context'
import { Mask } from '../mask-interfaces'
import { MaskAttributes, MaskComponent, MaskComponentAdapterType } from './mask-component-interfaces'

export class MaskComponentAdapter implements MaskComponentAdapterType {
  private component!: MaskComponent
  private resetHandlerTimer?: NodeJS.Timer

  constructor(private mask: Mask) {}

  get attributes(): MaskAttributes {
    return {
      inputMode: this.mask.inputMode,
      maxLength: this.mask.maxLength,
      minLength: this.mask.minLength,
      type: 'text',
      autoCapitalize: 'off',
      autoCorrect: 'off',
      spellcheck: false,
    }
  }

  bindComponent(component: MaskComponent): void {
    this.component = component
  }

  bindComponentDidLoad(): void {
    if (this.component && this.component.nativeInput) {
      this.component.nativeInput.value = this.component.value || ''
    }
    this.bindValueChanged(this.component.value, undefined)
  }

  bindConfigChanged(config: BalConfigState): void {
    const { component, mask } = this
    const context = new MaskLocaleContext({
      component,
      mask,
      event: {
        locale: `${config.language}-${config.region}`,
      },
    })
    this.mask.fireI18nChange(context)
    context.submit()
  }

  bindValueChanged(newValue?: string | undefined, oldValue?: string | undefined): void {
    const { component, mask } = this
    const context = new MaskValueChangedContext({
      component,
      mask,
      event: { newValue, oldValue },
    })
    this.mask.fireValueChanged(context)
    context.submit('blur')
  }

  bindKeyDown(event: KeyboardEvent): void {
    if (this.isComponentAccessible) {
      const { component, mask } = this
      const context = new MaskKeyboardContext({ event, component, mask })
      this.mask.fireKeyDown(context)
      const isTabKey = event.key === 'Tab'
      context.submit(isTabKey ? 'tab' : 'input')
      component.balKeyPress.emit(event)
    }
  }

  bindFocus(event: FocusEvent): void {
    if (this.isComponentAccessible) {
      const { component, mask } = this
      component.focused = true
      const context = new MaskFocusContext({ event, component, mask })
      this.mask.fireFocus(context)
      context.submit()
      component.balFocus.emit(event)
    }
  }

  bindBlur(event: FocusEvent): void {
    if (this.isComponentAccessible) {
      const { component, mask } = this
      component.focused = false
      const context = new MaskFocusContext({ event, component, mask })
      this.mask.fireBlur(context)
      context.submit('blur')
      component.balBlur.emit(event)
    }
  }

  bindPaste(event: ClipboardEvent): void {
    if (this.isComponentAccessible) {
      const { component, mask } = this
      const context = new MaskClipboardContext({ event, component, mask })
      this.mask.firePaste(context as any)
      context.submit()
    }
  }

  bindFormReset(event: UIEvent): void {
    const formElement = event.target as HTMLElement
    if (formElement && formElement.contains(this.component.el)) {
      this.component.value = this.component.initialValue
      this.component.inputValue = this.component.initialValue
      clearTimeout(this.resetHandlerTimer)
      this.resetHandlerTimer = setTimeout(() => {
        if (this.component.nativeInput) {
          this.component.nativeInput.value = this.component.value || ''
        }
      })
    }
  }

  bindClick(event: MouseEvent): void {
    if (this.isComponentAccessible) {
      const { component, mask } = this
      const context = new MaskMouseContext({ event, component, mask })
      this.mask.fireClick(context)
      context.submit()
    }
  }

  bindHostClick(event: MouseEvent): void {
    if (!this.isComponentAccessible) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  bindGlobalClick(event: MouseEvent): void {
    if (!this.isComponentAccessible) {
      if (event.target && event.target === this.component.el) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  }

  private get isComponentAccessible() {
    return !this.component.disabled && !this.component.readonly
  }
}
