import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-navbar',
  styleUrl: 'bal-navbar.sass',
})
export class Navbar {
  @Element() element!: HTMLElement

  /**
   * It `true` the navbar has a white background. Always use the blue header.
   */
  @Prop() light = false

  /**
   * Defines the type of navbar. App is used for almost every web applications
   * like the portal app. For our sales funnel we recommend to use the simple navbar.
   * Meta and main are used for the website.
   */
  @Prop() interface: BalProps.BalNavbarInterface = 'app'

  @Watch('interface')
  interfaceHandler() {
    this.updateProps(
      ['bal-navbar-brand', 'bal-navbar-menu', 'bal-navbar-menu-start', 'bal-navbar-menu-end'],
      'interface',
    )
  }

  @Method()
  toggleMenu(isMenuActive: boolean) {
    this.notifyComponents<any>(['bal-navbar-menu', 'bal-navbar-brand'], menu => menu.toggle(isMenuActive))
  }

  /**
   * Sets the content content width with the regular container classes
   */
  @Prop() container: 'fluid' | 'detail-page' | 'compact' | 'blog-page' | 'wide' | '' = ''

  componentWillLoad() {
    this.interfaceHandler()
  }

  private updateProps(selectors: string[], key: string) {
    const value = (this as any)[key]
    if (value !== undefined) {
      this.notifyComponents<any>(selectors, input => (input[key] = value))
    }
  }

  private notifyComponents<T>(selectors: string[], callback: (component: T) => void) {
    const components = this.element.querySelectorAll<Element>(selectors.join(', '))
    components.forEach(c => callback(c as any))
  }
  render() {
    const navbarEl = BEM.block('navbar')

    return (
      <Host
        class={{
          ...navbarEl.class(),
          ...navbarEl.modifier(`context-${this.interface}`).class(),
          ...navbarEl.modifier(`is-light`).class(this.light),
        }}
      >
        <nav
          role="navigation"
          aria-label="main navigation"
          class={{
            ...navbarEl.element('nav').class(),
            container: true,
            [`is-${this.container}`]: this.container !== '',
          }}
        >
          <slot></slot>
        </nav>
      </Host>
    )
  }
}
