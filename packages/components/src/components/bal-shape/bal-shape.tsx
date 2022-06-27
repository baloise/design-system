import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { Props } from '../../types'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-shape',
})
export class Shape implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * The shape variation
   */
  @Prop() variation: Props.BalShapeVariation = '1'

  /**
   * The shape color
   */
  @Prop() color: Props.BalShapeColor = 'green'

  /**
   * The shape rotation
   */
  @Prop() rotation?: Props.BalShapeRotation = '0'

  render() {
    const block = BEM.block('shape')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`is-variation-${this.variation}`).class(),
          ...block.modifier(`is-${this.color}`).class(),
          ...block.modifier(`is-${this.rotation}-deg`).class(!!this.rotation),
        }}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </Host>
    )
  }
}
