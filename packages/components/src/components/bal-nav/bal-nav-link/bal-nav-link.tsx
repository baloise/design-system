import { Component, h, ComponentInterface, Host, Element, State, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LogInstance, Logger } from '../../../utils/log'

@Component({
  tag: 'bal-nav-link',
  styleUrls: {
    css: 'bal-nav-link.sass',
  },
})
export class NavigationLink implements ComponentInterface {
  @Element() el!: HTMLElement

  @State() inputId?: string

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

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`has-variant-${this.variant}`).class(this.variant !== ''),
        }}
      >
        <a
          class={{
            ...block.element('native').class(),
            ...block
              .element('native')
              .modifier(`has-variant-${this.variant}`)
              .class(this.variant !== ''),
            ...block.element('native').modifier('selected').class(this.selected),
            ...block
              .element('native')
              .modifier('has-link')
              .class(this.href !== undefined),
          }}
          data-testid="bal-nav-link"
          href={this.href}
          target={this.target}
        >
          <slot></slot>
        </a>
      </Host>
    )
  }
}
