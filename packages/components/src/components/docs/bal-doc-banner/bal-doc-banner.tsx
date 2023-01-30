import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-banner',
  styleUrl: 'bal-doc-banner.sass',
})
export class DocBanner implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() subtitle = 'Component'
  @Prop() color = 'primary'
  @Prop() shadowDom = false

  render() {
    return (
      <Host style={{ marginBottom: '3rem', display: 'block' }}>
        <bal-doc-app>
          <div
            class={{
              'bal-doc-banner__inner pt-x-large pb-large px-large': true,
              ['bal-doc-banner__inner--' + this.color]: true,
            }}
            style={{
              marginTop: '-32px',
              marginLeft: '-32px',
              marginRight: '-32px',
            }}
          >
            <bal-heading space="none" subtitle level="h3" inverted={this.color === 'primary'}>
              {this.subtitle}
            </bal-heading>
            <bal-heading space="none" level="display-2" inverted={this.color === 'primary'}>
              <slot></slot>
              {this.shadowDom ? (
                <bal-tag class="ml-normal is-vertical-align-middle" color="red" light size="small">
                  <span class="has-text-weight-bold">Shadow DOM</span>
                </bal-tag>
              ) : (
                ''
              )}
            </bal-heading>
          </div>
        </bal-doc-app>
      </Host>
    )
  }
}
