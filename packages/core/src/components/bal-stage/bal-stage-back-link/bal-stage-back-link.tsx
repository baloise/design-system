import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-stage-back-link',
})
export class StageBackLink implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href!: string

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop() rel: string | undefined

  /**
   * If `true` adds a text shadow to improve readability on image background
   * */
  @Prop() shadow = false

  /**
   * If `true` the color gets inverted for dark backgrounds
   */
  @Prop() inverted = false

  render() {
    const block = BEM.block('stage-back-link')

    return (
      <Host class={{ ...block.class(), ...block.modifier('shadow').class(this.shadow) }}>
        <a
          class={{
            'link': true,
            'is-inverted': this.inverted,
          }}
          href={this.href}
          rel={this.rel}
        >
          <bal-icon
            class="mr-x-small"
            name="caret-left"
            size="x-small"
            inverted={this.inverted}
            shadow={this.shadow}
          ></bal-icon>
          <slot></slot>
        </a>
      </Host>
    )
  }
}
