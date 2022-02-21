import { Component, Element, h, Host, Prop, State, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'bal-navbar-brand',
  scoped: false,
  shadow: false,
})
export class NavbarBrand {
  @Element() el!: HTMLElement

  @State() isMenuActive = false

  /**
   * Link of the logo / title.
   */
  @Prop() href = '/'

  /**
   * If `true` the navbar does not have a mobil version. Only shows logo and an app title.
   */
  @Prop() simple = false

  /**
   * Emitted when the link element has clicked
   */
  @Event() balNavigate!: EventEmitter<MouseEvent>

  componentWillLoad() {
    // eslint-disable-next-line
    const isIE11 = !!window.MSInputMethodContext && !!(document as any).documentMode
    if (!isIE11 && window.matchMedia) {
      window.matchMedia('(min-width: 960px)').addEventListener('change', this.resetIsMenuActive.bind(this))
    }
  }

  async resetIsMenuActive(ev: MediaQueryListEvent) {
    if (ev.matches && !this.simple) {
      this.toggle(false)
    }
  }

  async toggle(isMenuActive: boolean): Promise<void> {
    this.isMenuActive = isMenuActive
    const navbar = this.el.closest('bal-navbar')
    if (navbar) {
      const navbarMenuElement = navbar.querySelector('bal-navbar-menu')
      if (navbarMenuElement && !this.simple) {
        await navbarMenuElement.toggle(this.isMenuActive)
      }
    }
  }

  async onClick() {
    if (!this.simple) {
      this.toggle(!this.isMenuActive)
    }
  }

  render() {
    return (
      <Host class="navbar-brand">
        <a class="navbar-item app-title" href={this.href} onClick={(event: MouseEvent) => this.balNavigate.emit(event)}>
          <slot></slot>
        </a>

        <a
          role="button"
          class={{
            'navbar-burger': true,
            'is-active': this.isMenuActive,
            'is-hidden': this.simple,
          }}
          aria-label="menu"
          aria-expanded={this.isMenuActive ? 'true' : 'false'}
          onClick={() => this.onClick()}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </Host>
    )
  }
}
