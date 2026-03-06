import { Component, Host, Prop, h } from '@stencil/core'

@Component({
  tag: 'bal-card-footer',
  styleUrl: 'bal-card-footer.host.scss',
  shadow: true,
})
export class CardFooter {
  @Prop() position: BalProps.BalCardFooterPosition = ''

  @Prop() buttons = false

  render() {
    return (
      <Host
        role="footer"
        class={{
          'card-footer': true,
          'buttons': this.buttons,
          'is-right': this.position === 'right',
          'is-center': this.position === 'center',
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
