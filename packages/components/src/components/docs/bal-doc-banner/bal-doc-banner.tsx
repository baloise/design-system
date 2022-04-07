import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-banner',
})
export class DocBanner implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() subtitle = 'Component'

  render() {
    return (
      <Host>
        <bal-doc-app>
          <div
            class="has-background-blue has-radius-large pt-7 pb-6 px-6"
            style={{
              marginTop: '-32px',
              marginLeft: '-32px',
              marginRight: '-32px',
            }}
          >
            <bal-heading space="none" inverted>
              <slot></slot>
            </bal-heading>
            <bal-heading space="none" subtitle level="h4" inverted>
              {this.subtitle}
            </bal-heading>
          </div>
        </bal-doc-app>
      </Host>
    )
  }
}
