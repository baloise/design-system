import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-color',
  styleUrl: 'bal-doc-color.scss',
  shadow: false,
  scoped: true,
})
export class BalDocColor {
  @Prop() inverted = false
  @Prop() background = false
  @Prop() color = ''
  @Prop() subject = ''
  @Prop() description = ''
  @Prop() scssVars = ''
  @Prop() hexVars = ''

  render() {
    const subject = this.subject !== '' ? this.subject : this.color
    const scssVars = this.scssVars !== '' ? this.scssVars : `$${this.color}`
    return (
      <Host class="bal-app">
        <div class="has-radius-large has-shadow">
          <div
            class={`has-background-${this.color} has-radius-top-large is-flex is-justify-content-center is-align-items-center`}
          >
            <strong
              class={`${this.inverted ? 'has-text-white' : 'has-text-blue'} has-font-title is-size-3 py-4`}
              style={{ minHeight: '80px' }}
            >
              {this.background ? 'A-a' : ''}
            </strong>
          </div>
          <div class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center p-2">
            <h5 class="title is-size-6 m-0">{subject}</h5>
            <bal-text size="small" style={{ textAlign: 'center' }}>
              {this.description}
            </bal-text>
            <p class="has-text-grey-5 is-small m-0">{this.hexVars}</p>
            <p class="has-text-grey-5 is-small m-0">{scssVars}</p>
          </div>
        </div>
      </Host>
    )
  }
}
