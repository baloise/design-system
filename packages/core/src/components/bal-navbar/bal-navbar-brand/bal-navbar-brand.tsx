import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { balBrowser } from '../../../utils/browser'
import { BalConfigState, BalLanguage, defaultConfig, ListenToConfig } from '../../../utils/config'
import { wait } from '../../../utils/helpers'
import { BalScrollHandler } from '../../../utils/scroll'
import { i18nBalNavbarBrand } from './bal-navbar-brand.i18n'

@Component({
  tag: 'bal-navbar-brand',
})
export class NavbarBrand {
  private bodyScrollHandler = new BalScrollHandler()

  @Element() el!: HTMLElement

  @State() language: BalLanguage = defaultConfig.language
  @State() isMenuActive = false

  /**
   * Link of the logo / title.
   */
  @Prop() href?: string = ''

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop() rel: string | undefined

  /**
   * If `true` the logo is rendered as a button
   */
  @Prop() logoClickable = false

  /**
   * Defines the label of the logo
   */
  @Prop() logoLabel?: string

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
   * Size of the logo SVG
   */
  @Prop() logoSize: BalProps.BalLogoSize = ''

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

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
  }

  async resetIsMenuActive(ev: MediaQueryListEvent) {
    if (ev.matches && !this.simple) {
      this.toggle(false)
    }
  }

  async toggle(isMenuActive: boolean): Promise<void> {
    this.isMenuActive = isMenuActive
    this.balWillAnimate.emit(this.isMenuActive)

    if (balBrowser.hasWindow && window.scrollY > 0) {
      window.scrollTo(0, 0)
    }

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

    // wait for the default animation time to ensure
    // the line of the tabs is at the correct position
    await wait(300)

    this.balDidAnimate.emit(this.isMenuActive)
  }

  async onClick() {
    this.toggle(!this.isMenuActive)
  }

  render() {
    const navbarBrandEl = BEM.block('navbar').element('brand')

    const logoTemplate = this.logo ? (
      <img class={{ ...navbarBrandEl.element('logo').class() }} src={this.logo} alt="" />
    ) : (
      <bal-logo animated={this.animated} color={'white'} size={this.logoSize}></bal-logo>
    )

    const logoLabel = this.logoLabel ? this.logoLabel : i18nBalNavbarBrand[this.language].logoButtonLabel

    return (
      <Host
        class={{
          ...navbarBrandEl.class(),
          ...navbarBrandEl.modifier(`context-${this.interface}`).class(),
        }}
      >
        {this.href ? (
          <a
            aria-label={logoLabel}
            title={logoLabel}
            href={this.href}
            rel={this.rel}
            target={this.target}
            onClick={(ev: MouseEvent) => this.balNavigate.emit(ev)}
          >
            {logoTemplate}
          </a>
        ) : this.logoClickable ? (
          <button aria-label={logoLabel} title={logoLabel} onClick={(ev: MouseEvent) => this.balNavigate.emit(ev)}>
            {logoTemplate}
          </button>
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
