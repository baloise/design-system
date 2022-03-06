import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-notices',
})
export class BalNotices {
  /**
   * @internal The interface tells the notice where to show the notice.
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
      >
        <slot></slot>
      </Host>
    )
  }
}
