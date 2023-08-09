import { Component, h, Host, Prop, Element, Watch, ComponentInterface } from '@stencil/core'
import { BalMutationObserver, ListenToMutation } from '../../../utils/mutation'
import { Event, EventEmitter } from '@stencil/core'
import { deepReady, waitAfterFramePaint } from '../../../utils/helpers'
import { BalAriaFormLinking, defaultBalAriaForm } from '../../../utils/form'

@Component({
  tag: 'bal-field',
  styleUrls: {
    css: 'bal-field.sass',
  },
})
export class Field implements ComponentInterface, BalMutationObserver {
  @Element() el!: HTMLElement

  private fieldId = `bal-field-${FieldIds++}`
  private formControlElement = ['bal-field-control']
  private inputElements = [
    'bal-input',
    'bal-number-input',
    'bal-textarea',
    'bal-select',
    'bal-datepicker',
    'bal-checkbox',
    'bal-radio',
    'bal-input-group',
    'bal-input-stepper',
    'bal-file-upload',
  ]
  private formElements = [...this.formControlElement, 'bal-field-label', 'bal-field-message']

  /**
   * If `true` the form control needs to be filled. If it is set to
   * `false` an optional label is added to the label..
   */
  @Prop() required?: boolean = undefined

  @Watch('required')
  requiredHandler() {
    this.updateProps([...this.inputElements, 'bal-field-label'], 'required')
  }

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop() invalid?: boolean = undefined

  @Watch('invalid')
  invalidHandler() {
    this.updateProps([...this.inputElements, ...this.formElements], 'invalid')
  }

  /**
   * If `true` the component gets a valid green style.
   */
  @Prop() valid = false

  @Watch('valid')
  validHandler() {
    this.updateProps([...this.inputElements, ...this.formElements], 'valid')
  }

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled?: boolean = undefined

  @Watch('disabled')
  disabledHandler() {
    this.updateProps([...this.inputElements, ...this.formElements], 'disabled')
  }

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly?: boolean = undefined

  @Watch('readonly')
  readonlyHandler() {
    this.updateProps([...this.inputElements, ...this.formElements], 'readonly')
  }

  /**
   * If `true` a loading spinner is visible at the end of the input
   */
  @Prop() loading?: boolean = undefined

  @Watch('loading')
  loadingHandler() {
    this.updateProps([...this.inputElements, ...this.formControlElement], 'loading')
  }

  /**
   * Emitted after render when element is labelled
   */
  @Event() balFormControlDidLoad!: EventEmitter<BalEvents.BalFieldAriaLabelledByDetail>

  connectedCallback() {
    this.triggerAllHandlers()
  }

  componentWillLoad() {
    this.triggerAllHandlers()
  }

  async componentDidLoad() {
    await this.syncAriaAttributes()
  }

  async syncAriaAttributes(): Promise<void> {
    await deepReady(this.el)
    await waitAfterFramePaint()

    const label: BalAriaFormLinking = this.el.querySelector<any>('bal-field-label bal-label')
    const message: BalAriaFormLinking = this.el.querySelector<any>('bal-field-message')
    const controls: BalAriaFormLinking[] = [
      ...Array.from(this.el.querySelectorAll<any>('bal-field-control bal-input')),
      ...Array.from(this.el.querySelectorAll<any>('bal-field-control bal-select')),
      ...Array.from(this.el.querySelectorAll<any>('bal-field-control bal-datepicker')),
      ...Array.from(this.el.querySelectorAll<any>('bal-field-control bal-checkbox')),
      ...Array.from(this.el.querySelectorAll<any>('bal-field-control bal-radio')),
      ...Array.from(this.el.querySelectorAll<any>('bal-field-control bal-number-input')),
      ...Array.from(this.el.querySelectorAll<any>('bal-field-control bal-time-input')),
      ...Array.from(this.el.querySelectorAll<any>('bal-field-control bal-input-slider')),
      ...Array.from(this.el.querySelectorAll<any>('bal-field-control bal-input-stepper')),
      ...Array.from(this.el.querySelectorAll<any>('bal-field-control bal-textarea')),
      ...Array.from(this.el.querySelectorAll<any>('bal-field-control bal-file-upload')),
    ]

    const ariaForm = defaultBalAriaForm

    if (label) {
      ariaForm.labelId = `${this.fieldId}-lbl`
    }

    if (message) {
      ariaForm.messageId = `${this.fieldId}-msg`
    }

    for (let index = 0; index < controls.length; index++) {
      const control = controls[index]

      if (index === 0) {
        ariaForm.controlId = `${this.fieldId}-ctrl`

        await label?.setAriaForm(ariaForm)
        await message?.setAriaForm(ariaForm)
        await control?.setAriaForm(ariaForm)
      } else {
        ariaForm.controlId = `${this.fieldId}-ctrl-${index}`
        await control?.setAriaForm(ariaForm)
      }
    }
  }

  mutationObserverActive = true

  @ListenToMutation({ subtree: false })
  mutationListener(): void {
    this.triggerAllHandlers()
    this.syncAriaAttributes()
  }

  private triggerAllHandlers() {
    this.requiredHandler()
    this.invalidHandler()
    this.validHandler()
    this.readonlyHandler()
    this.disabledHandler()
    this.loadingHandler()
  }

  private updateProps(selectors: string[], key: string) {
    const value = (this as any)[key]
    if (value !== undefined) {
      this.notifyComponents<any>(selectors, input => (input[key] = value))
    }
  }

  private notifyComponents<T>(selectors: string[], callback: (component: T) => void) {
    const components = this.el.querySelectorAll<Element>(selectors.join(', '))
    components.forEach(c => callback(c as any))
  }

  render() {
    return (
      <Host
        id={this.fieldId}
        class={{
          'bal-field': true,
          'field': true,
          'bal-field--invalid': this.invalid === true,
        }}
      >
        <slot></slot>
        <span class="hidden">{/* Empty slot element to keep the order of the children */}</span>
      </Host>
    )
  }
}

let FieldIds = 0
