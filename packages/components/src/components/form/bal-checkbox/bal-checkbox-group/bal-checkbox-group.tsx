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

@Component({
  tag: 'bal-checkbox-group',
})
export class CheckboxGroup implements ComponentInterface {
  private inputId = `bal-cg-${checkboxGroupIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  @Element() el!: HTMLElement

  /**
   * Displays the checkboxes vertically
   */
  @Prop() vertical = false

  /**
   * If `true` it acts as the main form control
   */
  @Prop() control = false

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true`, the user cannot interact with the radios.
   */
  @Prop() disabled?: boolean = undefined

  @Watch('disabled')
  disabledChanged(value: boolean | undefined) {
    if (this.control) {
      if (value !== undefined) {
        this.children.forEach(radio => {
          radio.disabled = value
        })
      }
    }
  }

  /**
   * If `true`, the user cannot interact with the radios.
   */
  @Prop() readonly?: boolean = undefined

  @Watch('readonly')
  readonlyChanged(value: boolean | undefined) {
    if (this.control) {
      if (value !== undefined) {
        this.children.forEach(radio => {
          radio.readonly = value
        })
      }
    }
  }

  /**
   * The value of the control.
   */
  @Prop({ mutable: true }) value: any[] = []

  @Watch('value')
  valueChanged(value: any[], oldValue: any[]) {
    if (this.control) {
      if (!areArraysEqual(this.value, oldValue)) {
        this.sync()
      }
      setTimeout(() => this.balChange.emit(value))
    }
  }

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<any[]>

  @Listen('balChange', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.control) {
      if (isDescendant(this.el, ev.target as HTMLElement)) {
        stopEventBubbling(ev)
      }
    }
  }

  componentWillLoad() {
    if (this.control) {
      this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
      this.sync()
      this.disabledChanged(this.disabled)
      this.readonlyChanged(this.readonly)
    }
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
      this.children.forEach((checkbox: HTMLBalCheckboxElement) => {
        checkbox.checked = false
      })
      this.children.forEach((checkbox: HTMLBalCheckboxElement) => {
        for (let index = 0; index < this.value.length; index++) {
          const item = this.value[index]
          if (item.toString() === checkbox.value.toString()) {
            checkbox.checked = true
          }
        }
      })
    }
  }

  private onClick = (ev: Event) => {
    if (!this.control) {
      return
    }

    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }
    stopEventBubbling(ev)

    // toggle clicked checkbox
    const selectedCheckbox = ev.target && (ev.target as HTMLElement).closest('bal-checkbox')
    if (selectedCheckbox) {
      selectedCheckbox.checked = !selectedCheckbox.checked
    }

    // generate new value array out of the checked checkboxes
    const checkboxes = this.children
    const newValue: any[] = []
    checkboxes.forEach(cb => {
      if (cb.checked) {
        newValue.push(cb.value)
      }
    })

    if (!areArraysEqual(this.value, newValue)) {
      this.value = [...newValue]
    }
  }

  render() {
    const label = findItemLabel(this.el)

    return (
      <Host
        class={{ 'is-vertical': this.vertical }}
        role="group"
        aria-labelledby={label?.id}
        aria-disabled={this.disabled ? 'true' : null}
        onClick={this.onClick}
        {...this.inheritedAttributes}
      >
        <div>
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let checkboxGroupIds = 0
