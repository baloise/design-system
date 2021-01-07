import { Component, Element, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-navbar',
  styleUrl: 'bal-navbar.scss',
  scoped: false,
  shadow: false,
})
export class Navbar {
  @Element() el: HTMLElement

  /**
   * It `true` the navbar has a white background
   */
  @Prop() light = false

  render() {
    return (
      <Host
        style={{
          position: 'reletiv',
          paddingTop: this.light ? '10px' : '',
        }}>
        <div
          class="bal-track-line"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            display: !this.light ? 'none' : '',
          }}></div>
        <nav
          class={'navbar is-spaced' + (this.light ? ' is-white' : ' is-info')}
          role="navigation"
          aria-label="main navigation">
          <slot></slot>
        </nav>
      </Host>
    )
  }
}
