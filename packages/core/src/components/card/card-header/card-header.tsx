import { Component, Host, Prop, h } from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'ds-card-header',
  styleUrl: 'card-header.host.scss',
  shadow: true,
})
export class CardHeader implements Loggable {
  log!: LogInstance

  @Logger('card-header')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Prop() direction: DS.CardHeaderDirection = 'row'

  render() {
    return (
      <Host role="banner">
        <slot></slot>
      </Host>
    )
  }
}
