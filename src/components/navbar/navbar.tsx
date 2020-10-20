import { Component, Element, h, Host, Prop, State } from '@stencil/core'

@Component({
  tag: 'bal-navbar',
  styleUrl: 'navbar.scss',
})
export class Navbar {

  hasNavbarStartSlot: boolean
  hasNavbarEndSlot: boolean

  @State() isMenuActive: boolean = false

  @Prop() light = false
  @Prop() logoHref = ''

  @Element() el: HTMLElement
;

  componentWillLoad() {
    this.hasNavbarStartSlot = !!this.el.querySelector('[slot="navbar-start"]')
    this.hasNavbarEndSlot = !!this.el.querySelector('[slot="navbar-end"]')
  }

  async toggle(): Promise<void> {
    this.isMenuActive = !this.isMenuActive
  }

  render() {
    return (
      <Host>
        <nav class={'navbar is-spaced' + (this.light ? ' is-white' : ' is-info')}
             role="navigation"
             aria-label="main navigation">
          <div class="bal-track-line"
               style={{
                 position: 'absolute',
                 top: '0',
                 left: '0',
                 display: !this.light ? 'none' : '',
               }}></div>
          <div class="navbar-brand">
            <a class="navbar-item app-title"
               href={this.logoHref}>
              <slot name="navbar-brand"/>
            </a>
            {this.hasNavbarStartSlot || this.hasNavbarEndSlot ?
              <a role="button"
                 class={'navbar-burger' + (this.isMenuActive ? ' is-active' : '')}
                 aria-label="menu"
                 aria-expanded={this.isMenuActive ? 'true' : 'false'}
                 onClick={() => this.toggle()}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
              : ''}
          </div>
          <div class={'navbar-menu' + (this.isMenuActive ? ' is-active' : '')}>
            <div class="navbar-start">
              <slot name="navbar-start"/>
            </div>
            <div class="navbar-end">
              <slot name="navbar-end"/>
            </div>
          </div>
        </nav>
      </Host>
    )
  }

}
