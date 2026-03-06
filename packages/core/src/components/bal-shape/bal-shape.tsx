import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { shapes } from './bal-shape.data'

@Component({
  tag: 'bal-shape',
  styleUrl: 'bal-shape.host.scss',
  shadow: true,
})
export class Shape implements ComponentInterface {
  @Element() el!: HTMLStencilElement

  /**
   * The shape variation
   */
  @Prop() variation: BalProps.BalShapeVariation = '1'

  /**
   * The shape color
   */
  @Prop() color: BalProps.BalShapeColor = 'green'

  /**
   * The shape rotation
   */
  @Prop() rotation?: BalProps.BalShapeRotation = '0'

  render() {
    return (
      <Host
        class={{
          [`has-rotation-${this.rotation}`]: this.rotation !== '0',
          [`is-${this.color}`]: true,
        }}
      >
        <svg
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 198 198"
          focusable="false"
          aria-hidden="true"
          // fill={this.getHex()}
        >
          {shapes[parseInt(this.variation) - 1]}
        </svg>
      </Host>
    )
  }
}
