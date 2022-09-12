import { areArraysEqual } from '@baloise/web-app-utils'
import {
  Component,
  h,
  Host,
  ComponentInterface,
  Prop,
  Element,
  Watch,
  Event,
  EventEmitter,
  Listen,
  Method,
} from '@stencil/core'
import { stopEventBubbling } from '../../../../helpers/form-input.helpers'
import { findItemLabel, inheritAttributes, isDescendant } from '../../../../helpers/helpers'
import { Props, Events } from '../../../../types'
import { BEM } from '../../../../utils/bem'

@Component({
  tag: 'bal-checkbox-group',
})
export class CheckboxGroup implements ComponentInterface {
  private inputId = `bal-cg-${checkboxGroupIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  @Element() el!: HTMLElement

  /**
   * Defines the layout of the checkbox button
   */
  @Prop() interface?: Props.BalCheckboxGroupInterface = undefined

  /**
   * If `true` it acts as the main form control
   */
  @Prop() control = false

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * Displays the checkboxes vertically
   */
  @Prop() vertical = false

  /**
   * If `true`, the controls will be vertically on mobile devices.
   */
  @Prop() verticalOnMobile = false

  /**
   * Uses the whole width
   */
  @Prop() expanded = false

  /**
   * If `true`, the user cannot interact with the checkboxes.
   */
  @Prop() disabled?: boolean = undefined

  @Watch('disabled')
  disabledChanged(value: boolean | undefined) {
    if (this.control) {
      if (value !== undefined) {
        this.children.forEach(child => {
          child.disabled = value
        })
      }
    }
  }

  /**
   * If `true`, the user cannot interact with the checkboxes.
   */
  @Prop() readonly?: boolean = undefined

  @Watch('readonly')
  readonlyChanged(value: boolean | undefined) {
    if (this.control) {
      if (value !== undefined) {
        this.children.forEach(child => {
          child.readonly = value
        })
      }
    }
  }

  /**
   * The value of the control.
   */
  @Prop({ mutable: true }) value: any[] = []

  @Watch('value')
  valueChanged(_value: any[], oldValue: any[]) {
    if (this.control) {
      if (!areArraysEqual(this.value, oldValue)) {
        this.sync()
      }
    } else {
      this.sync()
    }
  }

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<Events.BalCheckboxGroupChangeDetail>

  @Listen('balChange', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.control) {
      if (isDescendant(this.el, ev.target as HTMLElement)) {
        stopEventBubbling(ev)
      }
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(event: UIEvent) {
    const formElement = event.target as HTMLElement
    if (formElement?.contains(this.el)) {
      if (this.control) {
        this.value = []
      }
      this.sync()
    }
  }

  componentWillLoad() {
    if (this.control) {
      this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
      this.disabledChanged(this.disabled)
      this.readonlyChanged(this.readonly)
    }
    this.sync()
  }

  private get children(): HTMLBalCheckboxElement[] {
    return Array.from(this.el.querySelectorAll('bal-checkbox'))
  }

  /** @internal */
  @Method()
  async setValue(value: any[]) {
    if (this.control) {
      this.value = value
    }
  }

  private sync() {
    if (this.control) {
      const isChecked = (checkbox: HTMLBalCheckboxElement) => {
        for (let index = 0; index < this.value.length; index++) {
          const item = this.value[index]
          if (item.toString() === checkbox.value.toString()) {
            return true
          }
        }
        return false
      }

      this.children.forEach((checkbox: HTMLBalCheckboxElement) => {
        checkbox.checked = isChecked(checkbox)
      })
    }

    this.children.forEach((checkbox: HTMLBalCheckboxElement) => {
      if (this.interface) {
        checkbox.interface = this.interface
      }
    })
  }

  private onClick = (ev: Event) => {
    if (!this.control) {
      return
    }

    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }
    ev.preventDefault()

    // toggle clicked checkbox
    const selectedCheckbox = ev.target && (ev.target as HTMLElement).closest('bal-checkbox')
    if (selectedCheckbox) {
      if (selectedCheckbox.disabled || selectedCheckbox.readonly) {
        ev.stopPropagation()
        return
      }
    }

    // generate new value array out of the checked checkboxes
    const newValue: any[] = []
    this.children.forEach(cb => {
      if (cb.checked) {
        newValue.push(cb.value)
      }
    })

    if (!areArraysEqual(this.value, newValue)) {
      this.value = [...newValue]
      this.balChange.emit(this.value)
    }
  }

  render() {
    const label = findItemLabel(this.el)
    const block = BEM.block('radio-checkbox-group')
    const innerEl = block.element('inner')

    return (
      <Host
        class={{
          ...block.class(),
        }}
        role="group"
        aria-labelledby={label?.id}
        aria-disabled={this.disabled ? 'true' : null}
        onClick={this.onClick}
        {...this.inheritedAttributes}
      >
        <div
          class={{
            ...innerEl.class(),
            ...innerEl.modifier('vertical-mobile').class(this.verticalOnMobile),
            ...innerEl.modifier('vertical').class(this.vertical),
            ...innerEl.modifier('expanded').class(this.expanded),
            ...innerEl.modifier('select-button').class(this.interface === 'select-button'),
          }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let checkboxGroupIds = 0
