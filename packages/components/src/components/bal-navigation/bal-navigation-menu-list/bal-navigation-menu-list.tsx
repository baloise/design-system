import { Component, h, Host, Listen, Prop, State } from '@stencil/core'
import { BEM } from '@/components/utils/bem'
import { balBreakpoints } from '@/components/utils/breakpoints'
import { ResizeHandler } from '@/components/utils/resize'
import { Attributes } from '@/components/utils/attributes'

@Component({
  tag: 'bal-navigation-menu-list',
})
export class NavigationMenuList {
  /**
   * Color of the menu list card background
   */
  @Prop() color: BalProps.BalNavigationLevelBlockColor = 'white'
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
  @Prop() target: BalProps.BalButtonTarget = '_self'
  @Prop() tracking: Attributes = {}

  @State() headingLevel!: 'h3' | 'h4' | 'h5'

  resizeWidthHandler = ResizeHandler()

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.resizeWidthHandler(() => {
      this.setHeadingLevel()
    })
  }

  connectedCallback() {
    this.setHeadingLevel()
  }

  setHeadingLevel = () => {
    if (balBreakpoints.isTouch) {
      this.headingLevel = 'h5'
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
          color={
            this.color === 'grey' ||
            this.color === 'yellow' ||
            this.color === 'red' ||
            this.color === 'purple' ||
            this.color === 'green'
              ? this.color
              : ''
          }
        >
          <bal-card-content>
            {this.href ? (
              <a href={this.href} target={this.target} {...this.tracking}>
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
