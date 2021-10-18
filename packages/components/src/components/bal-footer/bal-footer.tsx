import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-footer',
  styleUrl: 'bal-footer.scss',
  scoped: true,
  shadow: false,
})
export class Footer {
  render() {
    return (
      <Host>
        <footer
          class={{
            footer: true,
          }}
        >
          <slot></slot>
        </footer>
      </Host>
    )
  }
}
