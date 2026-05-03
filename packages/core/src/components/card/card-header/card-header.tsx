import { Component, Element, Host, Prop, h } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, LogInstance, ValidateEmptyOrOneOf } from '@utils'
import { DsComponentInterface } from '@global'
import { CARD_HEADER_DIRECTIONS, CardHeaderDirection } from '../card.interfaces'

/**
 * Card header renders the header section of a card with optional layout direction for title and image/icon.
 *
 * @slot - Header content (title, icon, image, etc.).
 * @part card-header - The card header container element.
 */
@Component({
  tag: 'ds-card-header',
  styleUrl: 'card-header.host.scss',
  shadow: true,
})
export class CardHeader implements DsComponentInterface {
  log!: LogInstance

  @Logger('card-header')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @Prop()
  @ValidateEmptyOrOneOf(...CARD_HEADER_DIRECTIONS)
  readonly direction: CardHeaderDirection = 'row'

  render() {
    return (
      <Host role="banner">
        <slot></slot>
      </Host>
    )
  }
}
