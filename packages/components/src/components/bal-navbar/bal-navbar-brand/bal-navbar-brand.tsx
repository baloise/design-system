import { Component, Element, h, Host, Prop, State, Event, EventEmitter } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { BalScrollHandler } from '../../../utils/scroll'
import { balBrowser, balDevice } from '../../../interfaces'

@Component({
  tag: 'bal-navbar-brand',
})
export class NavbarBrand {
  private bodyScrollHandler = new BalScrollHandler()

  @Element() el!: HTMLElement

  @State() isMenuActive = false

  /**
   * Link of the logo / title.
   */
  @Prop() href?: string = ''

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop() target: BalProps.BalButtonTarget = '_self'

  /**
   * @deprecated Use interface on bal-navbar instead.
   * If `true` the navbar does not have a mobil version. Only shows logo and an app title.
   */
  @Prop() simple = false

  /**
   * Src to display a logo -> replaces the default Baloise Logo
   */
  @Prop() logo?: string

  /**
   * Defines if the logo animation should be active
   */
  @Prop() animated = true

  /**
   * @internal
   * Defines the type of navbar. App is used for almost every web applications
   * like the portal app. For our sales funnel we recommend to use the simple navbar.
   * Meta and main are used for the website.
   */
  @Prop() interface: BalProps.BalNavbarInterface = 'app'

  /**
   * Emitted when the link element has clicked
   */
  @Event() balNavigate!: EventEmitter<BalEvents.BalNavbarBrandNavigationChangeDetail>

  /**
   * Emitted before the animation starts
   */
  @Event() balWillAnimate!: EventEmitter<BalEvents.BalNavbarMenuWillAnimateDetail>

  /**
   * Emitted after the animation has finished
   */
  @Event() balDidAnimate!: EventEmitter<BalEvents.BalNavbarMenuDidAnimateDetail>

  connectedCallback() {
    this.bodyScrollHandler.connect()
  }

  componentWillLoad() {
    if (balBrowser.hasWindow && window.matchMedia) {
      window.matchMedia('(min-width: 960px)').addEventListener('change', this.resetIsMenuActive.bind(this))
    }
  }

  disconnectedCallback() {
    this.bodyScrollHandler.disconnect()
  }

  async resetIsMenuActive(ev: MediaQueryListEvent) {
    if (ev.matches && !this.simple) {
      this.toggle(false)
    }
  }

  async toggle(isMenuActive: boolean): Promise<void> {
    this.isMenuActive = isMenuActive
    this.balWillAnimate.emit(this.isMenuActive)

    if (this.isMenuActive) {
      this.bodyScrollHandler.disable()
    } else {
      this.bodyScrollHandler.enable()
    }

    const navbar = this.el.closest('bal-navbar')
    if (navbar) {
      const navbarMenuElement = navbar.querySelector('bal-navbar-menu')
      if (navbarMenuElement && !this.simple) {
        await navbarMenuElement.toggle(this.isMenuActive)
      }
    }
    this.balDidAnimate.emit(this.isMenuActive)
  }

  async onClick() {
    this.toggle(!this.isMenuActive)
  }

  render() {
    const navbarBrandEl = BEM.block('navbar').element('brand')

    const logoTemplate = this.logo ? (
      <img loading="lazy" class={{ ...navbarBrandEl.element('logo').class() }} src={this.logo} alt="" />
    ) : (
      <bal-logo animated={this.animated} color={'white'}></bal-logo>
    )

    return (
      <Host
        class={{
          ...navbarBrandEl.class(),
          ...navbarBrandEl.modifier(`context-${this.interface}`).class(),
        }}
      >
        {this.href ? (
          <a href={this.href} target={this.target} onClick={(event: MouseEvent) => this.balNavigate.emit(event)}>
            {logoTemplate}
          </a>
        ) : (
          logoTemplate
        )}
        <span class={{ ...navbarBrandEl.element('title').class() }}>
          <slot></slot>
        </span>
        <bal-button
          class={{
            ...navbarBrandEl.element('burger').class(),
            ...navbarBrandEl
              .element('burger')
              .modifier('hidden')
              .class(this.interface === 'simple'),
          }}
          color="light"
          inverted
          square
          icon={this.isMenuActive ? 'close' : 'menu-bars'}
          onClick={() => this.onClick()}
        ></bal-button>
      </Host>
    )
  }
}
