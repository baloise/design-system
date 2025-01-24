import { Component, h, Host, Prop, Element, Watch, ComponentInterface } from '@stencil/core'
import { BalMutationObserver, ListenToMutation } from '../../utils/mutation'
import { Event, EventEmitter } from '@stencil/core'
import { deepReady, waitAfterFramePaint } from '../../utils/helpers'
import { BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'

@Component({
  tag: 'bal-field',
  styleUrl: 'bal-field.sass',
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
    'bal-checkbox',
    'bal-radio',
    'bal-input-group',
    'bal-date',
    'bal-input-date',
    'bal-input-stepper',
    'bal-input-slider',
    'bal-file-upload',
    'bal-dropdown',
    'bal-segment',
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
   * If true, label and input are aligned horizontally within the field component, with the message positioned in a new line below.
   */
  @Prop() horizontal?: boolean = false

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

  private isDirectChild = (el: HTMLElement): boolean => {
    if (!el) {
      return false
    }

    const parent = el.parentElement
    if (!parent) {
      return false
    }
    if (parent.nodeName.toLowerCase() === 'bal-field' && parent !== this.el) {
      return false
    }
    if (parent === this.el) {
      return true
    }
    return this.isDirectChild(parent)
  }

  private isVisible = (el: HTMLElement): boolean => {
    if (!el) {
      return false
    }

    return el.ariaHidden !== 'true'
  }

  private findDirectChild = (selectors: string): BalAriaFormLinking | undefined => {
    const element = this.el.querySelector<any>(selectors)
    const isDirectChild = this.isDirectChild(element)
    if (isDirectChild) {
      if (this.isVisible(element)) {
        return element
      }
    }
    return undefined
  }

  private findDirectChildren = (selectors: string[]): BalAriaFormLinking[] => {
    return selectors
      .map(selector => {
        return Array.from(this.el.querySelectorAll<any>(selector)).filter(this.isDirectChild).filter(this.isVisible)
      })
      .flat()
  }

  async syncAriaAttributes(): Promise<void> {
    await deepReady(this.el)
    await waitAfterFramePaint()

    const label = this.findDirectChild('bal-field-label bal-label')
    const message = this.findDirectChild('bal-field-message')
    const controls = this.findDirectChildren([
      'bal-field-control bal-input',
      'bal-field-control bal-select',
      'bal-field-control bal-input-date',
      'bal-field-control bal-dropdown',
      'bal-field-control bal-checkbox',
      'bal-field-control bal-radio',
      'bal-field-control bal-segment',
      'bal-field-control bal-segment-item',
      'bal-field-control bal-checkbox-group',
      'bal-field-control bal-radio-group',
      'bal-field-control bal-number-input',
      'bal-field-control bal-time-input',
      'bal-field-control bal-input-slider',
      'bal-field-control bal-input-stepper',
      'bal-field-control bal-textarea',
      'bal-field-control bal-file-upload',
    ])

    const ariaForm = {...defaultBalAriaForm}

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

  @ListenToMutation({ subtree: false, waitAfterFramePrint: true })
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
          'bal-field--horizontal': this.horizontal === true,
        }}
      >
        <slot></slot>
        <span class="bal-field-hidden">{/* Empty slot element to keep the order of the children */}</span>
      </Host>
    )
  }
}

let FieldIds = 0
