import { Component, h, ComponentInterface, Host, Element, Prop, Listen } from '@stencil/core'
import { BEM } from '../../utils/bem'
import { ResizeHandler } from '../../utils/resize'

@Component({
  tag: 'bal-progress-bar',
  styleUrls: {
    css: 'bal-progress-bar.sass',
  },
})
export class ProgressBar implements ComponentInterface {
  @Element() el!: HTMLElement

  private lineEl?: HTMLDivElement
  private resizeHandler = ResizeHandler()

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of the bar in percentage. So min is 0 and 100 would be the max value.
   */
  @Prop() value = 0

  /**
   * The shape color
   */
  @Prop() background: BalProps.BalProgressBarBackground = 'white'

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentDidRender(): void {
    this.updateProgress()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('resize', { target: 'window' })
  async resizeListener() {
    this.resizeHandler(() => {
      this.updateProgress()
    })
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateProgress() {
    if (this.lineEl) {
      const maxWidth = this.el.clientWidth
      const value = Math.max(0, Math.min(100, this.value))
      const lineWidth = (maxWidth / 100) * value
      this.lineEl.style.width = `${lineWidth}px`

      if (value === 100) {
        this.lineEl.classList.add('bal-progress-bar__line--full')
      } else {
        this.lineEl.classList.remove('bal-progress-bar__line--full')
      }
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('progress-bar')
    const bemLineEl = block.element('line')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`background-${this.background}`).class(),
        }}
      >
        <div
          class={{
            ...bemLineEl.class(),
          }}
          ref={lineEl => (this.lineEl = lineEl)}
        ></div>
      </Host>
    )
  }
}
