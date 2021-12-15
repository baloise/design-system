import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-notices',
})
export class BalNotices {
  /**
   * The interface tells the notice where to show the notice.
   */
  @Prop() interface: 'toast' | 'snackbar' = 'toast'

  render() {
    return (
      <Host
        class={{
          'bal-app': true,
          'bal-notices': true,
          [`has-${this.interface}`]: true,
        }}
        style={{ display: 'flex' }}
      >
        <slot></slot>
      </Host>
    )
  }
}
