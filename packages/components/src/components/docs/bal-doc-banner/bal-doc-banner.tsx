import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-banner',
  styleUrl: 'bal-doc-banner.sass',
})
export class DocBanner implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() subtitle = 'Component'

  render() {
    return (
      <Host>
        <bal-doc-app>
          <div
            class="bal-doc-banner__inner pt-x-large pb-large px-large"
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
