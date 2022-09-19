import {
  Component,
  h,
  Host,
  Prop,
  Element,
  EventEmitter,
  Event,
  Watch,
  ComponentInterface,
  Method,
  Listen,
} from '@stencil/core'
import { stopEventBubbling } from '../../../../helpers/form-input.helpers'
import { findItemLabel, inheritAttributes, isDescendant } from '../../../../helpers/helpers'
import { Props, Events } from '../../../../types'
import { BEM } from '../../../../utils/bem'

@Component({
  tag: 'bal-radio-group',
})
export class RadioGroup implements ComponentInterface {
  private inputId = `bal-rg-${radioGroupIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private initialValue: number | string | boolean = ''

  @Element() el!: HTMLElement

  /**
   * Defines the layout of the radio button
   */
  @Prop() interface?: Props.BalRadioGroupInterface = undefined

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
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled?: boolean = undefined

  @Watch('disabled')
  disabledChanged(value: boolean | undefined) {
    if (value !== undefined) {
      this.children.forEach(child => {
        child.disabled = value
      })
    }
  }

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly?: boolean = undefined

  @Watch('readonly')
  readonlyChanged(value: boolean | undefined) {
    if (value !== undefined) {
      this.children.forEach(child => {
        child.readonly = value
      })
    }
  }

  /**
   * The value of the control.
   */
  @Prop({ mutable: true }) value: number | string | boolean = ''
  @Watch('value')
  valueChanged(value: number | string | boolean, oldValue: number | string | boolean) {
    if (value !== oldValue) {
      this.sync()
    }
  }

  /**
   * Emitted when the checked property has changed.
   */
  @Event() balChange!: EventEmitter<Events.BalRadioGroupChangeDetail>

  @Listen('balChange', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (isDescendant(this.el, ev.target as HTMLElement)) {
      stopEventBubbling(ev)
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(event: UIEvent) {
    const formElement = event.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.value = this.initialValue
      this.sync()
    }
  }

  connectedCallback() {
    this.initialValue = this.value
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
    this.sync()
    this.disabledChanged(this.disabled)
    this.readonlyChanged(this.readonly)
  }

  private get children(): HTMLBalRadioElement[] {
    return Array.from(this.el.querySelectorAll('bal-radio'))
  }

  /** @internal */
  @Method()
  async setValue(value: number | string | boolean) {
    this.value = value
  }

  private sync() {
    this.children.forEach((radio: HTMLBalRadioElement) => {
      if (this.interface) {
        radio.interface = this.interface
      }
      radio.checked = radio.value === this.value
    })
  }

  private onClick = (ev: Event) => {
    const element = ev.target as HTMLAnchorElement
    if (element.href) {
      return
    }
    ev.preventDefault()

    const selectedRadio = ev.target && (ev.target as HTMLElement).closest('bal-radio')
    if (selectedRadio) {
      if (selectedRadio.disabled || selectedRadio.readonly) {
        ev.stopPropagation()
        return
      }

      const currentValue = this.value
      const newValue = selectedRadio.value
      if (newValue !== currentValue) {
        this.value = newValue
        this.balChange.emit(this.value)
      }
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
        role="radiogroup"
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

let radioGroupIds = 0
