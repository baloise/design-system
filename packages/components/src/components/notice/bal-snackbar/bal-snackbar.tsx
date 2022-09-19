import { Component, Host, h, Prop, Method, Element, State, Event, EventEmitter } from '@stencil/core'
import { Props } from '../../../types'

@Component({
  tag: 'bal-snackbar',
})
export class Snackbar {
  @Element() element!: HTMLElement

  private timer!: NodeJS.Timer
  private snackbarId = `bal-snackbar-${snackbarIds++}`

  @State() animationClass = 'fadeInDown'

  /**
   * The theme type of the snackbar. Given by bulma our css framework.
   */
  @Prop() color: Props.BalSnackbarColor = ''

  /**
   * The duration of the snackbar
   */
  @Prop() duration = 0

  /**
   * The subject of the snackbar header
   */
  @Prop() subject = ''

  /**
   * The message of the snackbar as html content
   */
  @Prop() message = ''

  /**
   * The icon of the snackbar header
   */
  @Prop() icon = ''

  /**
   * Label text for the action button
   */
  @Prop() action = ''

  /**
   * @internal Handler for on close event
   */
  @Prop() closeHandler: () => void = () => void 0

  /**
   * @internal Handler for on action button click event
   */
  @Prop() actionHandler: () => void = () => void 0

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href?: string

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop() target: Props.BalButtonTarget = '_self'

  /**
   * Emitted when snackbar is closed
   */
  @Event() balClose!: EventEmitter<string>

  /**
   * Emitted when the action button is clicked
   */
  @Event() balAction!: EventEmitter<string>

  async componentWillLoad() {
    if (this.duration > 0) {
      await this.closeIn(this.duration)
    }
  }

  /**
   * Closes the snackbar after the given duration in ms
   */
  @Method()
  async closeIn(duration: number): Promise<void> {
    this.timer = setTimeout(() => this.close(), duration)
  }

  /**
   * Closes this snackbar
   */
  @Method()
  async close(): Promise<void> {
    clearTimeout(this.timer)
    this.balClose.emit(this.snackbarId)
    this.element.remove()
    this.closeHandler()
  }

  onActionHandler = () => {
    this.balAction.emit(this.snackbarId)
    this.actionHandler()
  }

  get colorType() {
    if (this.color === '') {
      return ''
    }
    return `bal-snackbar__inner--is-${this.color}`
  }

  get buttonType(): Props.BalButtonColor {
    if (this.color === '') {
      return 'info'
    }
    return this.color
  }

  render() {
    const labelAttributes = {} as any
    if (this.message !== undefined && this.message !== '') {
      labelAttributes.innerHTML = this.message
    }

    return (
      <Host id={this.snackbarId} class="bal-snackbar">
        <div role="alert" class={`bal-snackbar__inner ${this.animationClass} ${this.colorType} p-5`}>
          <div class="bal-snackbar__header">
            <span class="icon-text is-small">
              <span class="icon" style={{ display: this.icon ? '' : 'none' }}>
                <bal-icon name={this.icon} color={'primary'}></bal-icon>
              </span>
              <bal-heading level="h5" space="none">
                {this.subject}
              </bal-heading>
            </span>
          </div>
          <span class="bal-snackbar__label" {...labelAttributes}>
            <slot />
            <span class="hidden">{/* Empty slot element to keep the order of the children */}</span>
          </span>
          <bal-close class="bal-snackbar__close" onClick={() => this.close()}></bal-close>
          <div class="bal-snackbar__footer" style={{ display: this.action === '' ? 'none' : 'inline-flex' }}>
            <bal-button color="info" href={this.href} target={this.target} onClick={() => this.onActionHandler()}>
              {this.action}
            </bal-button>
          </div>
        </div>
      </Host>
    )
  }
}

let snackbarIds = 0
