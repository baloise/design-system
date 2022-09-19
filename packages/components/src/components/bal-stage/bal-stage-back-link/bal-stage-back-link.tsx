import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
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
      <Host class={{ ...block.class() }}>
        <a
          class={{
            'is-link': true,
            'is-inverted': this.inverted,
            'has-blur-shadow': this.shadow,
          }}
          href={this.href}
        >
          <bal-icon
            class="mr-2"
            name="caret-left"
            size="xsmall"
            inverted={this.inverted}
            shadow={this.shadow}
          ></bal-icon>
          <slot></slot>
        </a>
      </Host>
    )
  }
}
