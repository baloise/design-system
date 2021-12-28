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
  @Prop() color = 'primary'
  @Prop() subject = 'Primary'
  @Prop() description = ''
  @Prop() scssVars = ''

  render() {
    return (
      <Host class="bal-app">
        <div class="has-border-light">
          <div class={`has-background-${this.color} px-2 py-3`} style={{ minHeight: '60px' }}>
            <strong class={this.inverted ? 'has-text-white' : 'has-text-blue'}>{this.background ? 'A-a' : ''}</strong>
          </div>
          <div class="p-2 has-border-top">
            <h5 class="title is-size-5 my-1">{this.subject}</h5>
            <small class="has-text-hint mt-2">{this.description}</small>
            <p>{this.scssVars}</p>
          </div>
        </div>
      </Host>
    )
  }
}
