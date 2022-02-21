import { Component, Element, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-navbar',
})
export class Navbar {
  @Element() el!: HTMLElement

  /**
   * It `true` the burger button is hidden
   */
  @Prop() noBurger = false

  /**
   * It `true` the component uses the whole width
   */
  @Prop() expanded = false

  render() {
    return (
      <Host
        class={{ 'no-burger': this.noBurger }}
        style={{
          position: 'relative',
        }}
      >
        <nav
          class={{
            'navbar': true,
            'is-spaced': !this.expanded,
            'is-primary': true,
          }}
          role="navigation"
          aria-label="main navigation"
        >
          <slot></slot>
        </nav>
      </Host>
    )
  }
}
