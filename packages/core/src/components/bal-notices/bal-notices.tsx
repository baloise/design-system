import { Component, Host, h, Prop } from '@stencil/core'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-notices',
  styleUrl: 'bal-notices.sass',
})
export class Notices {
  /**
   * @internal Tells if the notice is animated
   */
  @Prop() animated = true

  /**
   * @internal The interface tells the notice where to show the notice.
   */
  @Prop() interface: 'toast' | 'snackbar' = 'toast'

  /**
   * @internal Sets the content content width with the regular container classes
   */
  @Prop() container: 'fluid' | 'detail-page' | 'compact' | 'blog-page' | 'wide' | '' | undefined = undefined

  render() {
    const block = BEM.block('notices')
    const innerEl = block.element('inner')

    const hasContainer = this.interface === 'toast' && this.container !== undefined

    return (
      <Host
        class={{
          'bal-app': true,
          ...block.class(),
          ...block.modifier('container').class(hasContainer),
          ...block.modifier('animated').class(this.animated),
        }}
      >
        <div
          class={{
            ...innerEl.class(),
            ...innerEl.modifier(this.interface).class(),
            container: hasContainer,
            [`is-${this.container}`]: hasContainer && this.container !== '',
          }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
