import { Component, Host, h, Prop, Watch, Element } from '@stencil/core'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-data',
})
export class Data {
  @Element() element!: HTMLElement

  /**
   * If `true` a bottom border is added to the data-item.
   */
  @Prop() border = false

  /**
   * If `true` the data list is horizontal instead of vertical.
   */
  @Prop() horizontal = false

  @Watch('border')
  borderHandler() {
    this.updateProps([...this.inputElements], 'border')
  }

  private inputElements = ['bal-data-item']

  private updateProps(selectors: string[], key: string) {
    const value = (this as any)[key]
    if (value !== undefined) {
      this.notifyComponents<any>(selectors, input => (input[key] = value))
    }
  }
  private notifyComponents<T>(selectors: string[], callback: (component: T) => void) {
    const components = this.element.querySelectorAll<Element>(selectors.join(', '))
    components.forEach((c: any) => callback(c))
  }

  componentWillLoad() {
    this.borderHandler()
  }
  render() {
    const block = BEM.block('data')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('has-border').class(this.border),
          ...block.modifier('is-horizontal').class(this.horizontal),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
