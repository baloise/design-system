import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-notices',
  styleUrl: 'bal-notices.scss',
  shadow: false,
  scoped: false,
})
export class BalNotices {
  @Prop() interface: 'toast' | 'snackbar' = 'toast'

  render() {
    return (
      <Host
        class={{
          'bal-app': true,
          'bal-notices': true,
          [`has-${this.interface}`]: true,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
