import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-card-title',
  styleUrl: 'bal-card-title.host.scss',
  shadow: true,
})
export class CardTitle {
  /**
   * If `true` the card text color becomes white.
   */
  @Prop() inverted = false

  /**
   * The actual heading level used in the HTML markup.
   */
  @Prop() level: BalProps.BalHeadingLevel = 'h3'

  /**
   * Make the visual style mimic a specific heading level.
   * This option allows you to make e.g. h1 visually look like h3,
   * but still keep it h1 in the markup.
   */
  @Prop() visualLevel?: BalProps.BalHeadingVisualLevel

  render() {
    return (
      <Host>
        <bal-heading level={this.level} visualLevel={this.visualLevel} space="none" inverted={this.inverted}>
          <slot></slot>
        </bal-heading>
      </Host>
    )
  }
}
