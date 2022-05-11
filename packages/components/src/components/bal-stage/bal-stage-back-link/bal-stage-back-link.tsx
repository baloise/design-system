import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-stage-back-link',
})
export class StageBackLink implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href!: string

  render() {
    return (
      <Host
        class={{
          'bal-stage-back-link': true,
        }}
      >
        <a
          class={{
            'mb-5': true,
          }}
          href={this.href}
        >
          <bal-icon class="mr-2" name="caret-left" size="xsmall"></bal-icon>
          <slot></slot>
        </a>
      </Host>
    )
  }
}
