import { Component, h, Host, Element, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'
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

  render() {
    const navMenuListEl = BEM.block('nav').element('menu').element('list')

    return (
      <Host
        class={{
          ...navMenuListEl.class(),
          ...navMenuListEl.modifier(`context-${this.color}`).class(),
        }}
      >
        <bal-card class={{ ...navMenuListEl.element('card').class() }} flat color={this.color}>
          <bal-card-content>
            {this.href ? (
              <a href={this.href} target={this.target}>
                <bal-heading
                  class={{ ...navMenuListEl.element('card').element('heading').class() }}
                  level="h4"
                  space="none"
                >
                  {this.headline}
                </bal-heading>
              </a>
            ) : (
              <bal-heading
                class={{ ...navMenuListEl.element('card').element('heading').class() }}
                level="h4"
                space="none"
              >
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
