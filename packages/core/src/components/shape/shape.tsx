import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { shapes } from './shape.data'
import { Loggable, Logger, type LogInstance } from '@utils'

@Component({
  tag: 'ds-shape',
  styleUrl: 'shape.host.scss',
  shadow: true,
})
export class Shape implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('shape')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * The shape variation
   */
  @Prop({ reflect: true }) readonly variation: DS.ShapeVariation = '1'

  /**
   * The shape color
   */
  @Prop({ reflect: true }) readonly color: DS.ShapeColor = 'green'

  /**
   * The shape rotation
   */
  @Prop({ reflect: true }) readonly rotation: DS.ShapeRotation = '0'

  render() {
    return (
      <Host aria-hidden="true">
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 198 198" focusable="false" aria-hidden="true">
          {shapes[parseInt(this.variation) - 1]}
        </svg>
      </Host>
    )
  }
}
