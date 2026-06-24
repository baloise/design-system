import { Component, Element, h, Host, Prop } from '@stencil/core'
import { Logger, LogInstance, hasValue, OneOf, Type } from '@utils'
import { HTMLStencilElement } from '@stencil/core/internal'
import { HEADING_COLORS, HeadingColor } from '../../heading/heading.interfaces'
import { DsComponentInterface } from '@global'

/**
 * Card subtitle renders a subtitle heading for cards with customizable color and styling.
 *
 * @slot - The subtitle text.
 * @part card-subtitle - The card subtitle element.
 */
@Component({
  tag: 'ds-card-subtitle',
  styleUrl: 'card-subtitle.host.scss',
  shadow: true,
})
export class CardSubtitle implements DsComponentInterface {
  log!: LogInstance

  @Logger('card-subtitle')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * If `true` the card text color becomes white.
   */
  @Prop()
  @Type('boolean')
  readonly inverted: boolean = false

  /**
   * If `true` the card text color is bold.
   */
  @Prop()
  @Type('boolean')
  readonly bold: boolean = false

  /**
   * If `true` the card text color becomes white.
   */
  @Prop()
  @OneOf(HEADING_COLORS)
  readonly color: HeadingColor = ''

  render() {
    return (
      <Host
        class={{
          'card-header': true,
        }}
      >
        <span
          class={{
            'text': true,
            'is-bold': this.bold,
            [`is-${this.color}`]: hasValue(this.color) && !this.inverted,
            'is-inverted': this.inverted,
          }}
        >
          <slot></slot>
        </span>
      </Host>
    )
  }
}
