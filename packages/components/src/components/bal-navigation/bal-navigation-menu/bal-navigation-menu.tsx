import { Component, h, Host, Element, Prop, State, Listen } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { isPlatform } from '../../../utils/platform'
import { Props } from '../../../props'

@Component({
  tag: 'bal-navigation-menu',
})
export class NavigationMenu {
  @Element() el!: HTMLBalNavigationMenuElement
  @Prop() linkHref?: string
  @Prop() linkName?: string
  @Prop() target: Props.BalButtonTarget = '_self'
  @State() isTouch: boolean = isPlatform('touch')

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.isTouch = isPlatform('touch')
  }

  render() {
    const navMenuEl = BEM.block('nav').element('menu')

    return (
      <Host
        class={{
          'is-block': true,
          ...navMenuEl.class(),
        }}
      >
        {this.linkHref && (
          <div class="menu-link-wrapper is-block">
            <a class="is-size-x-small menu-link is-bold" href={this.linkHref} target={this.target}>
              {this.linkName}
            </a>
          </div>
        )}
        <div class="columns is-multiline">
          <div class={{ 'column is-full is-6-desktop is-two-thirds-widescreen': true, 'py-0': this.isTouch }}>
            <slot name="left"></slot>
          </div>
          <div class={{ 'column is-full is-6-desktop is-one-third-widescreen': true, 'pt-0': this.isTouch }}>
            <slot name="right"></slot>
          </div>
        </div>
      </Host>
    )
  }
}
