import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance, normalizeDeprecatedTShirtSize, hasValue, OneOf, Type } from '@utils'
import { DsComponentInterface } from '@global'
import {
  DividerLayout,
  DividerSpace,
  DividerColor,
  DIVIDER_LAYOUTS,
  DIVIDER_SPACES,
  DIVIDER_COLORS,
} from './divider.interfaces'

/**
 * Divider renders a visual separator line for grouping or distinguishing content sections.
 *
 * @part divider - The divider line element.
 */
@Component({
  tag: 'ds-divider',
  styleUrl: './divider.host.scss',
  shadow: true,
})
export class Divider implements DsComponentInterface {
  log!: LogInstance

  @Element() el!: HTMLStencilElement

  @Logger('divider')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the position of the child elements if they
   * are showed verticaly or horizontally. Default is verticaly.
   */
  @Prop()
  @OneOf(DIVIDER_LAYOUTS)
  readonly layout: DividerLayout = 'horizontal'

  /**
   * Defines the space between the child elements. Default is xx-small.
   */
  @Prop()
  @OneOf(DIVIDER_SPACES)
  readonly space: DividerSpace = 'none'

  /**
   * Defines the color of the separator line.
   */
  @Prop()
  @OneOf(DIVIDER_COLORS)
  readonly color: DividerColor = 'grey'

  /**
   * Defines if the separator line is dashed or solid. Default is solid.
   */
  @Prop()
  @Type('boolean')
  readonly dashed: boolean = false

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const space = normalizeDeprecatedTShirtSize(this.space) || ''

    return (
      <Host
        role="separator"
        class={{
          [`is-${this.layout}`]: hasValue(this.layout),
          [`is-${this.color}`]: hasValue(this.color),
          [`has-space-${space}`]: hasValue(this.space),
          [`is-dashed`]: this.dashed,
        }}
      ></Host>
    )
  }
}
