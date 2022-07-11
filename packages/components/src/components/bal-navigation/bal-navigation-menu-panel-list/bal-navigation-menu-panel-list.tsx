import { Component, h, Host, Element, Prop, Listen, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { isPlatform } from '../../../utils/platform'

@Component({
  tag: 'bal-navigation-menu-panel-list',
  scoped: false,
  shadow: false,
})
export class NavigationMenuPanelList {
  @Element() el!: HTMLBalNavigationMenuPanelListElement
  @Prop() color: 'white' | 'grey' = 'white'
  @Prop() headline?: string
  @Prop() href?: string
  @State() isMobile: boolean = isPlatform('mobile')

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.isMobile = isPlatform('mobile')
  }

  render() {
    const navMenuPanelListEl = BEM.block('nav').element('panel').element('list')

    return (
      <Host
        class={{
          'is-block mb-7': true,
          ...navMenuPanelListEl.class(),
          ...navMenuPanelListEl.modifier(`context-${this.color === 'grey' ? 'service' : 'default'}`).class(),
        }}
      >
        <bal-card class="m-0" flat color={this.color}>
          <bal-card-content class={{ 'py-0': this.color !== 'grey', 'px-0': !this.isMobile && this.color !== 'grey' }}>
            <a href={this.href}>
              <bal-heading class="mb-4" level="h5" space="none">
                {this.headline}
              </bal-heading>
            </a>
            <slot name="links"></slot>
          </bal-card-content>
        </bal-card>
      </Host>
    )
  }
}
