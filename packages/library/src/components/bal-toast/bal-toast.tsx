import { Component, Host, h, Prop, Method, Element, State } from '@stencil/core'

@Component({
  tag: 'bal-toast',
  styleUrl: 'bal-toast.scss',
  scoped: true,
  shadow: false,
})
export class Toast {
  timer: NodeJS.Timer
  @Element() element: HTMLBalToastElement
  @State() animationClass = 'fadeInDown'

  /**
   * The theme type of the toast. Given by bulma our css framework.
   */
  @Prop() type: 'is-primary' | 'is-info' | 'is-success' | 'is-warning' | 'is-danger' = 'is-primary'

  /**
   * Closes the toast after the given duration in ms
   */
  @Method()
  async closeIn(duration: number): Promise<void> {
    this.timer = setTimeout(() => this.close(), duration)
  }

  /**
   * Closes this toast
   */
  @Method()
  async close(): Promise<void> {
    clearTimeout(this.timer)
    this.animationClass = 'fadeOut'
    this.timer = setTimeout(() => {
      this.element.remove()
      clearTimeout(this.timer)
    }, 150)
  }

  render() {
    return (
      <Host class="container">
        <div role="alert" onClick={() => this.close()} class={`toast ${this.animationClass} ${this.type}`}>
          <bal-text>
            <slot />
          </bal-text>
        </div>
      </Host>
    )
  }
}
