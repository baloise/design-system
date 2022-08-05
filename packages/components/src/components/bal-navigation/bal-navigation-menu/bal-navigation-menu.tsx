import { Component, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { Props } from '../../../props'

@Component({
  tag: 'bal-navigation-menu',
})
export class NavigationMenu {
  @Prop() linkHref?: string
  @Prop() linkName?: string
  @Prop() target: Props.BalButtonTarget = '_self'

  render() {
    const navMenuEl = BEM.block('nav').element('menu')
    return (
      <Host
        class={{
          ...navMenuEl.class(),
        }}
      >
        {this.linkHref && (
          <div
            class={{
              ...navMenuEl.element('link').class(),
            }}
          >
            <a href={this.linkHref} target={this.target}>
              {this.linkName}
            </a>
          </div>
        )}
        <div
          class={{
            'columns is-multiline': true,
            ...navMenuEl.element('wrapper').class(),
          }}
        >
          <div
            class={{
              'column is-full is-6-desktop is-two-thirds-widescreen': true,
            }}
          >
            <slot name="left"></slot>
          </div>
          <div
            class={{
              'column is-full is-6-desktop is-one-third-widescreen': true,
            }}
          >
            <slot name="right"></slot>
          </div>
        </div>
      </Host>
    )
  }
}
