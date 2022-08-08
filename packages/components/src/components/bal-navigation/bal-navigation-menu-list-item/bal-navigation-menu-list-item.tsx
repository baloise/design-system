import { Component, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { Props } from '../../../props'

@Component({
  tag: 'bal-navigation-menu-list-item',
})
export class NavigationMenuListItem {
  @Prop() href?: string
  @Prop() target: Props.BalButtonTarget = '_self'

  render() {
    const navMenuListItemEl = BEM.block('nav').element('menu').element('list').element('item')

    return (
      <Host
        class={{
          ...navMenuListItemEl.class(),
        }}
      >
        <a
          class={{
            ...navMenuListItemEl.element('link').class(),
          }}
          href={this.href}
          target={this.target}
        >
          <slot></slot>
        </a>
      </Host>
    )
  }
}
