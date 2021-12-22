import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-image',
})
export class BalDocImage {
  @Prop() src = ''
  @Prop() text = ''

  render() {
    return (
      <Host class="bal-app">
        <p style={{ textAlign: 'center' }}>
          <img src={this.src} alt={this.text} />
        </p>
      </Host>
    )
  }
}
