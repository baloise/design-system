import { Component, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LevelInfo } from '../utils/level.utils'
import { Attributes } from '../../../utils/attributes'

@Component({
  tag: 'bal-navigation-menu',
})
export class NavigationMenu {
  @Prop() linkHref?: string
  @Prop() linkName?: string
  @Prop() target: BalProps.BalButtonTarget = '_self'
  @Prop() elements: LevelInfo[] = []
  @Prop() tracking: Attributes = {}

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
            <a href={this.linkHref} target={this.target} {...this.tracking}>
              {this.linkName} ➞
            </a>
          </div>
        )}
        {this.elements && (
          <div style={{ overflow: 'hidden' }}>
            <div
              class={{
                'grid is-multiline': true,
                ...navMenuEl.element('wrapper').class(),
              }}
            >
              {this.elements.some(subLevel => subLevel.color === 'white') && (
                <div
                  class={{
                    'bal-nav__menu__white-list__wrapper col is-full is-6-desktop is-two-thirds-widescreen': true,
                  }}
                >
                  <div class={{ ...navMenuEl.element('white-list').class() }}>
                    {this.elements
                      .filter(subLevel => subLevel.color === 'white')
                      .map(block => {
                        return (
                          block && (
                            <bal-navigation-menu-list
                              headline={block.label}
                              href={block.link}
                              target={block.target}
                              tracking={block.trackingData}
                            >
                              <div slot="links">
                                {block.subLevels?.map(item => (
                                  <bal-navigation-menu-list-item
                                    href={item.link}
                                    target={item.target}
                                    tracking={item.trackingData}
                                  >
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
              {this.elements.some(
                subLevel =>
                  subLevel.color === 'grey' ||
                  subLevel.color === 'yellow' ||
                  subLevel.color === 'red' ||
                  subLevel.color === 'purple' ||
                  subLevel.color === 'green',
              ) && (
                <div
                  class={{
                    'col is-full is-6-desktop is-one-third-widescreen': true,
                    ...navMenuEl.element('grey-list').class(),
                  }}
                >
                  {this.elements
                    .filter(
                      subLevel =>
                        subLevel.color === 'grey' ||
                        subLevel.color === 'yellow' ||
                        subLevel.color === 'red' ||
                        subLevel.color === 'purple' ||
                        subLevel.color === 'green',
                    )
                    .map(block => (
                      <bal-navigation-menu-list
                        headline={block.label}
                        href={block.link}
                        color={block.color}
                        target={block.target}
                        tracking={block.trackingData}
                      >
                        <div slot="links">
                          {block.subLevels?.map(item => (
                            <bal-navigation-menu-list-item
                              href={item.link}
                              target={item.target}
                              tracking={item.trackingData}
                            >
                              {item.label}
                            </bal-navigation-menu-list-item>
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
