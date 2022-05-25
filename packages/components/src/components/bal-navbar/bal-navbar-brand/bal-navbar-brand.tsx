import { Component, Element, h, Host, Prop, State, Event, EventEmitter, Listen } from '@stencil/core'
import { isPlatform } from '../../../'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navbar-brand',
  scoped: false,
  shadow: false,
})
export class NavbarBrand {
  @Element() el!: HTMLElement

  @State() isMenuActive = false
  @State() isDesktop = false

  /**
   * Link of the logo / title.
   */
  @Prop() href = '/'

  /**
   * If `true` the navbar does not have a mobil version. Only shows logo and an app title.
   */
  @Prop() simple = false

  /**
   * @internal
   * TODO: describe
   */
  @Prop() interface: 'app' | 'simple' | 'meta' | 'stage' = 'app'

  /**
   * Emitted when the link element has clicked
   */
  @Event() balNavigate!: EventEmitter<MouseEvent>

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.isDesktop = isPlatform('desktop')
  }

  componentWillLoad() {
    this.resizeHandler()
    // if (window.matchMedia) {
    //   window.matchMedia('(min-width: 960px)').addEventListener('change', this.resetIsMenuActive.bind(this))
    // }
  }

  // async resetIsMenuActive(ev: MediaQueryListEvent) {
  //   if (ev.matches && !this.simple) {
  //     this.toggle(false)
  //   }
  // }

  // async toggle(isMenuActive: boolean): Promise<void> {
  //   this.isMenuActive = isMenuActive
  //   const navbar = this.el.closest('bal-navbar')
  //   if (navbar) {
  //     const navbarMenuElement = navbar.querySelector('bal-navbar-menu')
  //     if (navbarMenuElement && !this.simple) {
  //       await navbarMenuElement.toggle(this.isMenuActive)
  //     }
  //   }
  // }

  // async onClick() {
  //   if (!this.simple) {
  //     this.toggle(!this.isMenuActive)
  //   }
  // }

  render() {
    const navbarBrandEl = BEM.block('navbar').element('brand')

    return (
      <Host
        class={{
          ...navbarBrandEl.class(),
          ...navbarBrandEl.modifier(this.interface).class(),
        }}
      >
        <a href={this.href} onClick={(event: MouseEvent) => this.balNavigate.emit(event)}>
          <bal-logo
            size={this.isDesktop ? 'normal' : 'small'}
            color={this.interface === 'stage' ? 'blue' : 'white'}
          ></bal-logo>
          <span>
            <slot></slot>
          </span>
        </a>
      </Host>
    )
  }
}
