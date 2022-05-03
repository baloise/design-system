import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-banner',
  styleUrl: 'bal-doc-banner.sass',
})
export class DocBanner implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() subtitle = 'Component'

  @Prop() status = ''

  render() {
    return (
      <Host>
        <bal-doc-app>
          <div
            class="bal-doc-banner__inner pt-7 pb-6 px-6"
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
            <div class="mt-4" style={{ display: this.subtitle === 'Component' ? 'block' : 'none' }}>
              <bal-doc-banner-status context={this.status.split(',').map(s => s.trim()) as any} />
            </div>
          </div>
        </bal-doc-app>
      </Host>
    )
  }
}
