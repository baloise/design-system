import { Component, Host, h, Prop, Method, Element, State, Event, EventEmitter } from '@stencil/core'
import { ColorTypes } from '../../types/color.types'

@Component({
  tag: 'bal-toast',
  styleUrl: 'bal-toast.scss',
  scoped: true,
  shadow: false,
})
export class Toast {
  @Element() element!: HTMLBalToastElement
  timer!: NodeJS.Timer
  toastId = `bal-toast-${toastIds++}`
  @State() animationClass = 'fadeInDown'

  /**
   * The theme type of the toast. Given by bulma our css framework.
   */
  @Prop() color: ColorTypes | '' = ''

  /**
   * The duration of the toast in milliseconds.
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
    if (this.color === '') {
      return ''
    }
    return `is-${this.color}`
  }

  render() {
    return (
      <Host id={this.toastId}>
        <div role="alert" onClick={() => this.close()} class={`toast ${this.animationClass} ${this.colorType}`}>
          <bal-text class="toast-message">
            <slot />
          </bal-text>
          <bal-icon name="close" class="close" size="xsmall" inverted={this.color !== ''}></bal-icon>
        </div>
      </Host>
    )
  }
}

let toastIds = 0
