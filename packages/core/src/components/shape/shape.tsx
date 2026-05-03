import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { shapes } from './shape.data'
import { Logger, type LogInstance } from '@utils'
import { ShapeVariation, ShapeColor, ShapeRotation } from './shape.interfaces'
import { DsComponentInterface } from '@global'

/**
 * Shape renders decorative geometric shapes with customizable color, size, rotation, and variation.
 *
 * @slot - Optional overlay content or labels.
 * @part shape - The SVG shape element container.
 */
@Component({
  tag: 'ds-shape',
  styleUrl: 'shape.host.scss',
  shadow: true,
})
export class Shape implements DsComponentInterface {
  log!: LogInstance

  @Logger('shape')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * The shape variation
   */
  @Prop({ reflect: true }) readonly variation: ShapeVariation = '1'

  /**
   * The shape color
   */
  @Prop({ reflect: true }) readonly color: ShapeColor = 'green'

  /**
   * The shape rotation
   */
  @Prop({ reflect: true }) readonly rotation: ShapeRotation = '0'

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
