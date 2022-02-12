import { Component, Element, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-navbar',
})
export class Navbar {
  @Element() el!: HTMLElement

  /**
   * It `true` the navbar has a white background
   */
  @Prop() light = false

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
          paddingTop: this.light ? '10px' : '',
        }}
      >
        <div
          class="bal-track-line"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            display: !this.light ? 'none' : '',
          }}
        ></div>
        <nav
          class={{
            'navbar': true,
            'is-spaced': !this.expanded,
            'is-white': this.light,
            'is-info': !this.light,
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
