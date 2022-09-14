import { Component, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { Props } from '../../../props'
import { LevelInfo } from '../utils/level.utils'

@Component({
  tag: 'bal-navigation-menu',
})
export class NavigationMenu {
  @Prop() linkHref?: string
  @Prop() linkName?: string
  @Prop() target: Props.BalButtonTarget = '_self'
  @Prop() elements: LevelInfo[] = []

  render() {
    const navMenuEl = BEM.block('nav').element('menu')
    return (
      <Host
        class={{
          ...navMenuEl.class(),
        }}
      >
        {this.linkHref && this.linkName && (
          <div
            class={{
              ...navMenuEl.element('link').class(),
            }}
          >
            <a href={this.linkHref} target={this.target}>
              {this.linkName} ➞
            </a>
          </div>
        )}
        {this.elements && (
          <div style={{ overflow: 'hidden' }}>
            <div
              class={{
                'columns is-multiline': true,
                ...navMenuEl.element('wrapper').class(),
              }}
            >
              {this.elements.some(subLevel => subLevel.color === 'white') && (
                <div
                  class={{
                    'bal-nav__menu__white-list__wrapper column is-full is-6-desktop is-two-thirds-widescreen': true,
                  }}
                >
                  <div class={{ ...navMenuEl.element('white-list').class() }}>
                    {this.elements
                      .filter(subLevel => subLevel.color === 'white')
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
                </div>
              )}
              {this.elements.some(subLevel => subLevel.color === 'grey') && (
                <div
                  class={{
                    'column is-full is-6-desktop is-one-third-widescreen': true,
                    ...navMenuEl.element('grey-list').class(),
                  }}
                >
                  {this.elements
                    .filter(subLevel => subLevel.color === 'grey')
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
              )}
            </div>
          </div>
        )}
      </Host>
    )
  }
}
