import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-app',
  scoped: false,
  shadow: false,
  assetsDirs: ['assets']
})
export class App {
  /**
   * If `true` it adds a light background to the app
   */
  @Prop() background = false

  /**
   * If `true` the bal-app can be used with header, main and footer. The footer will then be sticky to the bottom.
   */
  @Prop() hasStickyFooter = false

  render() {
    return (
      <Host
        role="application"
        class={{
          'bal-app': true,
          'has-sticky-footer': this.hasStickyFooter,
          'bal-app-background': this.background,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
