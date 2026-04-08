import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-card-subtitle',
  styleUrl: 'bal-card-subtitle.host.scss',
  shadow: true,
})
export class CardSubtitle {
  /**
   * If `true` the card text color becomes white.
   */
  @Prop() inverted = false

  /**
   * If `true` the card text color is bold.
   */
  @Prop() bold = false

  /**
   * If `true` the card text color becomes white.
   */
  @Prop() color: BalProps.BalHeadingColor = ''

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
