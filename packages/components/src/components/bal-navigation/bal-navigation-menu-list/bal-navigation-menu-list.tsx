import { Component, h, Host, Listen, Prop, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { Props } from '../../../types'
import { isPlatform } from '../../../utils/platform'

@Component({
  tag: 'bal-navigation-menu-list',
})
export class NavigationMenuList {
  /**
   * Color of the menu list card background
   */
  @Prop() color: 'white' | 'grey' = 'white'
  /**
   * Optional headline of the menu list card
   */
  @Prop() headline?: string
  /**
   * Optional href of the menu list card headline as link
   */
  @Prop() href?: string
  /**
   * Target of the menu list card headline target as link
   */
  @Prop() target: Props.BalButtonTarget = '_self'
  @State() headingLevel!: 'h3' | 'h4'

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.setHeadingLevel()
  }

  connectedCallback() {
    this.setHeadingLevel()
  }

  setHeadingLevel = () => {
    if (isPlatform('touch')) {
      this.headingLevel = 'h4'
      return
    }
    this.headingLevel = 'h3'
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
        <bal-card
          class={{ ...navMenuListEl.element('card').class() }}
          flat
          color={this.color === 'grey' ? this.color : ''}
        >
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
