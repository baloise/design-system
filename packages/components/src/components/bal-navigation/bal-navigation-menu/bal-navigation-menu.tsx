import { Component, h, Host, Element, Prop, State, Listen, Watch } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { isPlatform } from '../../../utils/platform'
import { Props } from '../../../props'
import { LevelInfo } from '../utils/level.utils'

@Component({
  tag: 'bal-navigation-menu',
})
export class NavigationMenu {
  @Element() el!: HTMLBalNavigationMenuElement
  @Prop() linkHref?: string
  @Prop() linkName?: string
  @Prop() target: Props.BalButtonTarget = '_self'
  @Prop() menuElements?: string
  @State() isTouch: boolean = isPlatform('touch')
  private _menuElements?: LevelInfo[]

  componentWillLoad() {
    this.menuElementsWatcher()
  }

  @Watch('menuElements')
  menuElementsWatcher() {
    if (this.menuElements) {
      this._menuElements = JSON.parse(this.menuElements)
    }
  }

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
        <div class="columns is-multiline my-0">
          <div class={{ 'column is-full is-6-desktop is-two-thirds-widescreen': true, 'py-0': this.isTouch }}>
            {this._menuElements
              ?.filter(subLevel => subLevel.color !== 'grey')
              .map(block => {
                return (
                  block && (
                    <bal-navigation-menu-list headline={block.label} href={block.link} target={block.target}>
                      <div slot="links">
                        {block.subLevels?.map(item => (
                          <bal-navigation-menu-list-item href={item.link} target={item.target}>
                            {item.label}
                          </bal-navigation-menu-list-item>
                        ))}
                      </div>
                    </bal-navigation-menu-list>
                  )
                )
              })}
          </div>
          <div class={{ 'column is-full is-6-desktop is-one-third-widescreen': true, 'pt-0': this.isTouch }}>
            {this._menuElements
              ?.filter(subLevel => subLevel.color === 'grey')
              .map(block => (
                <bal-navigation-menu-list headline={block.label} href={block.link} color={block.color}>
                  <div slot="links">
                    {block.subLevels?.map(item => (
                      <bal-navigation-menu-list-item href={item.link}>{item.label}</bal-navigation-menu-list-item>
                    ))}
                  </div>
                </bal-navigation-menu-list>
              ))}
          </div>
        </div>
      </Host>
    )
  }
}
