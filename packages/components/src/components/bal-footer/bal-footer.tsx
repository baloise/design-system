import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-footer',
  styleUrl: 'bal-footer.scss',
  scoped: true,
  shadow: false,
})
export class Footer {
  /**
   * If `true` the footer shows a track line at the bottom.
   */
  @Prop() hasTrackLine: boolean = false

  render() {
    return (
      <Host>
        <footer
          class={{
            'footer': true,
            'has-track-line': this.hasTrackLine,
          }}
        >
          <slot></slot>
        </footer>
      </Host>
    )
  }
}
