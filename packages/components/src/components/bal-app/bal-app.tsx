import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-app',
  scoped: false,
  shadow: false,
})
export class App {
  /**
   * If `true` it adds a light background to the app
   */
  @Prop() background = false

  render() {
    return (
      <Host
        role="application"
        class={{
          'bal-app': true,
          'has-sticky-footer': true,
          'bal-app-background': this.background,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
