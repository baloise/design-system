import { Component, h, ComponentInterface, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navigation-meta',
})
export class NavigationMeta implements ComponentInterface {
  /**
   * aria label for meta navigation bar
   */
  @Prop() ariaLabelMeta?: string = ''

  render() {
    const metaEl = BEM.block('nav').element('meta')

    return (
      <Host
        class={{
          ...metaEl.class(),
        }}
      >
        <nav class="container" role="navigation" aria-label={this.ariaLabelMeta}>
          <slot></slot>
        </nav>
      </Host>
    )
  }
}
