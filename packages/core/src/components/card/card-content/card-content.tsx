import { Component, Element, Host, h } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, LogInstance } from '@utils'
import { DsComponentInterface } from '@global'

/**
 * Card content renders the main content area of a card for grouping body text and media.
 *
 * @slot - The card content (text, images, etc.).
 * @part card-content - The card content container element.
 */
@Component({
  tag: 'ds-card-content',
  styleUrl: 'card-content.host.scss',
  shadow: true,
})
export class CardContent implements DsComponentInterface {
  log!: LogInstance

  @Logger('card-content')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
