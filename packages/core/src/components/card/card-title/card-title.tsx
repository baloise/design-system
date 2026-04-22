import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'ds-card-title',
  styleUrl: 'card-title.host.scss',
  shadow: true,
})
export class CardTitle implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('card-title')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * If `true` the card text color becomes white.
   */
  @Prop() readonly inverted = false

  /**
   * The actual heading level used in the HTML markup.
   */
  @Prop() readonly level: DS.HeadingLevel = 'h3'

  /**
   * Make the visual style mimic a specific heading level.
   * This option allows you to make e.g. h1 visually look like h3,
   * but still keep it h1 in the markup.
   */
  @Prop() readonly visualLevel?: DS.HeadingVisualLevel

  render() {
    return (
      <Host>
        <ds-heading level={this.level} visualLevel={this.visualLevel} space="none" inverted={this.inverted}>
          <slot></slot>
        </ds-heading>
      </Host>
    )
  }
}
