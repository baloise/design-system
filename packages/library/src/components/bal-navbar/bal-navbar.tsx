import { Component, Element, h, Host, Prop, State } from '@stencil/core'

@Component({
  tag: 'bal-navbar',
  styleUrl: 'bal-navbar.scss',
  scoped: false,
  shadow: false,
})
export class Navbar {
  @Element() el: HTMLElement

  hasNavbarStartSlot: boolean
  hasNavbarEndSlot: boolean

  @State() isMenuActive: boolean = false

  /**
   * It `true` the navbar has a white background
   */
  @Prop() light = false

  /**
   * Defines the link on the logo.
   */
  @Prop() logoHref = ''

  componentWillLoad() {
    this.hasNavbarStartSlot = !!this.el.querySelector('[slot="navbar-start"]')
    this.hasNavbarEndSlot = !!this.el.querySelector('[slot="navbar-end"]')
    window.matchMedia('(min-width: 960px)').addEventListener('change', this.resetIsMenuActive.bind(this))
  }

  async toggle(): Promise<void> {
    this.isMenuActive = !this.isMenuActive
  }

  async resetIsMenuActive(e) {
    if (e.matches) {
      this.isMenuActive = false;
    }
  }

  render() {
    return (
      <Host>
        <nav
          class={'navbar is-spaced' + (this.light ? ' is-white' : ' is-info')}
          role="navigation"
          aria-label="main navigation">
          <div
            class="bal-track-line"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              display: !this.light ? 'none' : '',
            }}></div>
          <div class="navbar-brand">
            <a class="navbar-item app-title" href={this.logoHref}>
              <slot name="navbar-brand" />
            </a>
            {this.hasNavbarStartSlot || this.hasNavbarEndSlot ? (
              <a
                role="button"
                class={'navbar-burger' + (this.isMenuActive ? ' is-active' : '')}
                aria-label="menu"
                aria-expanded={this.isMenuActive ? 'true' : 'false'}
                onClick={() => this.toggle()}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            ) : (
              ''
            )}
          </div>
          <div class={'navbar-menu' + (this.isMenuActive ? ' is-active' : '')}>
            <div class="navbar-start">
              <slot name="navbar-start" />
            </div>
            <div class="navbar-end">
              <slot name="navbar-end" />
            </div>
          </div>
        </nav>
      </Host>
    )
  }
}
