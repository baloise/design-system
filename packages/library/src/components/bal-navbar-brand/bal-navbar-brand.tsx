import { Component, Element, h, Host, Prop, State, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'bal-navbar-brand',
  scoped: false,
  shadow: false,
})
export class NavbarBrand {
  @Element() el: HTMLElement

  @State() isMenuActive = false

  /**
   * Link of the logo / title.
   */
  @Prop() href = '/'

  /**
   * Emitted when the link element has clicked
   */
  @Event({ eventName: 'balNavigate' }) balNavigate: EventEmitter<MouseEvent>

  componentWillLoad() {
    var isIE11 = !!window.MSInputMethodContext && !!(document as any).documentMode
    if (!isIE11) {
      window.matchMedia('(min-width: 960px)').addEventListener('change', this.resetIsMenuActive.bind(this))
    }
  }

  async resetIsMenuActive(e) {
    if (e.matches) {
      this.toggle(false)
    }
  }

  async toggle(isMenuActive: boolean): Promise<void> {
    this.isMenuActive = isMenuActive
    const navbarMenuElement = this.el.closest('bal-navbar').querySelector('bal-navbar-menu')
    if (navbarMenuElement) {
      await (navbarMenuElement as any).toggle(this.isMenuActive)
    }
  }

  async onClick() {
    this.toggle(!this.isMenuActive)
  }

  render() {
    return (
      <Host class="navbar-brand">
        <a class="navbar-item app-title" href={this.href} onClick={(event: MouseEvent) => this.balNavigate.emit(event)}>
          <slot></slot>
        </a>

        <a
          role="button"
          class={'navbar-burger' + (this.isMenuActive ? ' is-active' : '')}
          aria-label="menu"
          aria-expanded={this.isMenuActive ? 'true' : 'false'}
          onClick={() => this.onClick()}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </Host>
    )
  }
}
