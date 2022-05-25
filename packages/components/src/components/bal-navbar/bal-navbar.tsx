import { Component, Element, h, Host, Prop, Watch } from '@stencil/core'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-navbar',
})
export class Navbar {
  @Element() element!: HTMLElement

  /**
   * It `true` the navbar has a white background. Always use the blue header.
   */
  @Prop() light = false

  /**
   * TODO: describe
   */
  @Prop() interface: 'app' | 'simple' | 'meta' | 'stage' = 'app'

  @Watch('interface')
  interfaceHandler() {
    this.updateProps(['bal-navbar-brand', 'bal-navbar-menu-start'], 'interface')
  }

  /**
   * TODO: describe
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
      <Host class={{ ...navbarEl.class(), ...navbarEl.modifier(this.interface).class() }}>
        <nav
          role="navigation"
          aria-label="main navigation"
          class={{
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
