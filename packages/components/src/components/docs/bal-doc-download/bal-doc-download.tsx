import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-download',
  shadow: false,
  scoped: false,
})
export class BalDocDownload {
  @Prop() link = ''
  @Prop() iconLeft = 'document'
  @Prop() iconRight = 'download'
  @Prop() subject = ''
  @Prop() subtitle = ''

  render() {
    return (
      <Host class="bal-app">
        <a href={this.link} style={{ textDecoration: 'none' }}>
          <bal-card>
            <bal-card-content>
              <bal-list disabled>
                <bal-list-item>
                  <bal-list-item-icon>
                    <bal-icon name={this.iconLeft}></bal-icon>
                  </bal-list-item-icon>
                  <bal-list-item-content>
                    <bal-list-item-title>{this.subject}</bal-list-item-title>
                    <bal-list-item-subtitle>{this.subtitle}</bal-list-item-subtitle>
                  </bal-list-item-content>
                  <bal-list-item-icon right>
                    <bal-icon name={this.iconRight}></bal-icon>
                  </bal-list-item-icon>
                </bal-list-item>
              </bal-list>
            </bal-card-content>
          </bal-card>
        </a>
      </Host>
    )
  }
}
