import { Component, h, Host, Listen, Prop, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { Props } from '../../../props'
import { isPlatform } from '../../../utils/platform'

@Component({
  tag: 'bal-navigation-menu-list',
})
export class NavigationMenuList {
  @Prop() color: 'white' | 'grey' = 'white'
  @Prop() headline?: string
  @Prop() href?: string
  @Prop() target: Props.BalButtonTarget = '_self'
  @State() headingLevel!: 'h4' | 'h5'

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.setHeadingLevel()
  }

  connectedCallback() {
    this.setHeadingLevel()
  }

  setHeadingLevel = () => {
    if (isPlatform('touch')) {
      this.headingLevel = 'h5'
      return
    }
    this.headingLevel = 'h4'
  }

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
                  level={this.headingLevel}
                  space="none"
                >
                  {this.headline}
                </bal-heading>
              </a>
            ) : (
              <bal-heading
                class={{ ...navMenuListEl.element('card').element('heading').class() }}
                level={this.headingLevel}
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
