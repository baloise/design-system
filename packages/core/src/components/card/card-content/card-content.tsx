import { Component, Host, h } from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'ds-card-content',
  styleUrl: 'card-content.host.scss',
  shadow: true,
})
export class CardContent implements Loggable {
  log!: LogInstance

  @Logger('card-content')
  createLogger(log: LogInstance) {
    this.log = log
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
