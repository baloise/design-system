import { Component, h, ComponentInterface, Host, Element, Prop, Watch } from '@stencil/core'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-input-group',
  styleUrl: 'bal-input-group.sass',
})
export class InputGroup implements ComponentInterface {
  @Element() el!: HTMLElement

  private inputGroupElements = ['bal-divider']

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  @Watch('invalid')
  invalidHandler() {
    this.updateProps([...this.inputGroupElements], 'invalid')
  }

  @Watch('disabled')
  disabledHandler() {
    this.updateProps([...this.inputGroupElements], 'disabled')
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
    console.log('updateProps ', components)
  }

  render() {
    const block = BEM.block('input-group')
    const dangerClass = 'is-danger'
    const hasDanger = this.invalid
    const disabledClass = 'is-disabled'
    const hasDisabled = this.disabled || this.readonly

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(dangerClass).class(hasDanger),
          ...block.modifier(disabledClass).class(hasDisabled),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
