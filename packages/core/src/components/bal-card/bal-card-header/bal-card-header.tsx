import { Component, Host, Prop, h } from '@stencil/core'

@Component({
  tag: 'bal-card-header',
  styleUrl: 'bal-card-header.host.scss',
  shadow: true,
})
export class CardHeader {
  @Prop() direction: BalProps.BalCardHeaderDirection = 'row'

  @Prop() closable = false

  render() {
    return (
      <Host
        class={
          {
            // 'card-header': true,
            // 'as-row': this.direction === 'row',
            // 'as-col': this.direction === 'column',
          }
        }
      >
        <slot></slot>
        {this.closable && <bal-close></bal-close>}
      </Host>
    )
  }
}
