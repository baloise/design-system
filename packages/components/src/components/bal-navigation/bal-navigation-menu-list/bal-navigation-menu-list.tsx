import { Component, h, Host, Element, Prop, Listen, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { isPlatform } from '../../../utils/platform'
import { Props } from '../../../props'

@Component({
  tag: 'bal-navigation-menu-list',
})
export class NavigationMenuList {
  @Element() el!: HTMLBalNavigationMenuListElement
  @Prop() color: 'white' | 'grey' = 'white'
  @Prop() headline?: string
  @Prop() href?: string
  @Prop() target: Props.BalButtonTarget = '_self'
  @State() isMobile: boolean = isPlatform('mobile')

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.isMobile = isPlatform('mobile')
  }

  render() {
    const navMenuListEl = BEM.block('nav').element('menu').element('list')

    return (
      <Host
        class={{
          'is-block mb-7': true,
          ...navMenuListEl.class(),
          ...navMenuListEl.modifier(`context-${this.color}`).class(),
        }}
      >
        <bal-card class="m-0" flat color={this.color}>
          <bal-card-content class={{ 'py-0': this.color !== 'grey', 'px-0': !this.isMobile && this.color !== 'grey' }}>
            {this.href ? (
              <a href={this.href} target={this.target}>
                <bal-heading class="mb-4" level="h4" space="none">
                  {this.headline}
                </bal-heading>
              </a>
            ) : (
              <bal-heading class="mb-4" level="h4" space="none">
                {this.headline}
              </bal-heading>
            )}
            <slot name="links"></slot>
          </bal-card-content>
        </bal-card>
      </Host>
    )
  }
}
