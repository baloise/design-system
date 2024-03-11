import { Component, h, ComponentInterface, Host, Prop } from '@stencil/core'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-nav-link',
  styleUrl: 'bal-nav-link.sass',
})
export class NavigationLink implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('bal-nav-link')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the variant of the link
   */
  @Prop() variant: BalProps.BalNavLinkVariant = ''

  /**
   * If `true` the link gets selected with a underline
   */
  @Prop() selected = false

  /**
   * If `true` the link can be clickable
   */
  @Prop() clickable = false

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href?: string

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop() target: BalProps.BalButtonTarget = '_self'

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('nav-link')
    const { href, target } = this
    const hasLink = href !== undefined && href !== ''
    const hasVariant = this.variant !== ''

    const Link = hasLink ? 'a' : this.clickable ? 'button' : 'span'
    let linkAttributes = {}
    if (hasLink) {
      linkAttributes = { href, target }
    }

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`variant-${this.variant}`).class(hasVariant),
        }}
      >
        <Link
          data-test="bal-nav-link"
          class={{
            ...block.element('native').class(),
            ...block.element('native').modifier(`variant-${this.variant}`).class(hasVariant),
            ...block
              .element('native')
              .modifier('selected')
              .class(this.selected && (hasLink || this.clickable)),
          }}
          {...linkAttributes}
        >
          <slot></slot>
        </Link>
      </Host>
    )
  }
}
