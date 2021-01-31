import { Component, Host, h, Prop, Method, Element, State, Event, EventEmitter } from '@stencil/core'
import { ColorTypes } from '../../types/color.types'

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
  @Prop() type: ColorTypes | '' = ''

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

  get colorType() {
    if (this.type === '') {
      return ''
    }
    return `is-${this.type}`
  }

  render() {
    return (
      <Host id={this.toastId}>
        <div role="alert" onClick={() => this.close()} class={`toast ${this.animationClass} ${this.colorType}`}>
          <span class="toast-message">
            <slot />
          </span>
          <bal-icon name="close" class="close" size="xsmall" inverted={this.type !== ''}></bal-icon>
        </div>
      </Host>
    )
  }
}

let toastIds = 0
