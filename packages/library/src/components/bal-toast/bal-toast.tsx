import { Component, Host, h, Prop, Method, Element, State, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'bal-toast',
  styleUrl: 'bal-toast.scss',
  scoped: true,
  shadow: false,
})
export class Toast {
  toastId = `bal-to-${toastIds++}`
  timer: NodeJS.Timer
  @Element() element: HTMLBalToastElement
  @State() animationClass = 'fadeInDown'

  /**
   * The theme type of the toast. Given by bulma our css framework.
   */
  @Prop() type: 'primary' | 'info' | 'success' | 'warning' | 'danger' | '' = ''

  /**
   * The duration of the toast
   */
  @Prop() duration: number = 0

  /**
   * Emitted when toast is closed
   */
  @Event({ eventName: 'balClose' }) balClose!: EventEmitter<string>

  async componentWillLoad() {
    if (this.duration > 0) {
      await this.closeIn(this.duration)
    }
  }

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
      clearTimeout(this.timer)
      this.balClose.emit(this.toastId)
      this.element.remove()
    }, 150)
  }

  render() {
    return (
      <Host id={this.toastId}>
        <div role="alert" onClick={() => this.close()} class={`toast ${this.animationClass} ${this.type}`}>
          <bal-text>
            <slot />
          </bal-text>
          <bal-icon name="close-thin" class="close" color="white" size="medium" isRight></bal-icon>
        </div>
      </Host>
    )
  }
}

let toastIds = 0
