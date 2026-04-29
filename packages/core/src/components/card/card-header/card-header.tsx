import { Component, Element, Host, Prop, h } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, LogInstance } from '@utils'
import { DsComponentInterface } from '@global'
import { CardHeaderDirection } from '../card.interfaces'

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

  @Prop() readonly direction: CardHeaderDirection = 'row'

  render() {
    return (
      <Host role="banner">
        <slot></slot>
      </Host>
    )
  }
}
