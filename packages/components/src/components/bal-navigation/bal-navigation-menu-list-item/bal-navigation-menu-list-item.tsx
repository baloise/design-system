import { Component, h, Host, Element, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navigation-menu-list-item',
})
export class NavigationMenuListItem {
  @Element() el!: HTMLBalNavigationMenuListItemElement
  @Prop() href?: string

  render() {
    const navMenuListItemEl = BEM.block('nav').element('menu').element('list').element('item')

    return (
      <Host
        class={{
          'is-block': true,
          ...navMenuListItemEl.class(),
        }}
      >
        <a class="is-block mt-2" href={this.href}>
          <slot></slot>
        </a>
      </Host>
    )
  }
}
