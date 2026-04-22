import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'ds-card-subtitle',
  styleUrl: 'card-subtitle.host.scss',
  shadow: true,
})
export class CardSubtitle implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('card-subtitle')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * If `true` the card text color becomes white.
   */
  @Prop() readonly inverted = false

  /**
   * If `true` the card text color is bold.
   */
  @Prop() readonly bold = false

  /**
   * If `true` the card text color becomes white.
   */
  @Prop() readonly color: DS.HeadingColor = ''

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
            [`is-${this.color}`]: this.color !== '' && !this.inverted,
            'is-inverted': this.inverted,
          }}
        >
          <slot></slot>
        </span>
      </Host>
    )
  }
}
