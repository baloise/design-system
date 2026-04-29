import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, LogInstance } from '@utils'
import { DsComponentInterface } from '@global'
import { HeadingLevel, HeadingVisualLevel } from '../../heading/heading.interfaces'

@Component({
  tag: 'ds-card-title',
  styleUrl: 'card-title.host.scss',
  shadow: true,
})
export class CardTitle implements DsComponentInterface {
  log!: LogInstance

  @Logger('card-title')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * If `true` the card text color becomes white.
   */
  @Prop() readonly inverted: boolean = false

  /**
   * The actual heading level used in the HTML markup.
   */
  @Prop() readonly level: HeadingLevel = 'h3'

  /**
   * Make the visual style mimic a specific heading level.
   * This option allows you to make e.g. h1 visually look like h3,
   * but still keep it h1 in the markup.
   */
  @Prop() readonly visualLevel: HeadingVisualLevel = ''

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
