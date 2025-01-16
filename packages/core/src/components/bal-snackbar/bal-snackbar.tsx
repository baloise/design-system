import { Component, Host, h, Prop, Method, Element, State, Event, EventEmitter } from '@stencil/core'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-snackbar',
  styleUrl: 'bal-snackbar.sass',
})
export class Snackbar {
  @Element() element!: HTMLElement

  private timer!: NodeJS.Timeout
  private snackbarId = `bal-snackbar-${snackbarIds++}`

  /**
   * The theme type of the snackbar.
   */
  @Prop() color: BalProps.BalSnackbarColor = ''

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
  @Prop() target: BalProps.BalButtonTarget = '_self'

  /**
   * Emitted when snackbar is closed
   */
  @Event() balClose!: EventEmitter<BalEvents.BalSnackbarCloseDetail>

  /**
   * Emitted when the action button is clicked
   */
  @Event() balAction!: EventEmitter<BalEvents.BalSnackbarActionDetail>

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

  // get colorType() {
  //   if (this.color === '') {
  //     return ''
  //   }
  //   return `bal-snackbar__inner--is-${this.color}`
  // }

  // get buttonType(): BalProps.BalButtonColor {
  //   if (this.color === '') {
  //     return 'info'
  //   }
  //   return this.color
  // }

  render() {
    const block = BEM.block('snackbar')
    const detailsEl = block.element('details')
    const buttonWrapperEl = block.element('button-wrapper')

    const subjectId = this.snackbarId + '-subject'

    const messageAttributes = {} as any
    if (this.message !== undefined && this.message !== '') {
      messageAttributes.innerHTML = this.message
    }

    const isIconDefined = this.icon !== undefined && this.icon !== null && this.icon !== ''
    const colorIcons = {
      info: 'info-circle',
      primary: 'info-circle',
      warning: 'alert-triangle',
      danger: 'alert-triangle',
      success: 'check-circle',
    }
    const icon = isIconDefined ? this.icon : colorIcons[this.color || 'info']

    return (
      <Host
        id={this.snackbarId}
        role="alertdialog"
        class={{ ...block.class(), ...block.modifier(`color-${this.color}`).class(!!this.color) }}
        aria-labelledby={subjectId}
      >
        <div class={{ ...detailsEl.class() }}>
          <div
            aria-hidden="true"
            class={{
              ...detailsEl.element('icon').class(),
            }}
          >
            <bal-icon name={icon} color={'primary'} size="medium"></bal-icon>
          </div>
          <div class={{ ...detailsEl.element('content').class() }}>
            <h2 id={subjectId}>{this.subject}</h2>
            <span {...messageAttributes}>
              <slot />
              <span class="hidden">{/* Empty slot element to keep the order of the children */}</span>
            </span>
          </div>
          <div class={{ ...detailsEl.element('close').class() }}>
            <bal-close
              class="bal-snackbar__close"
              data-testid="bal-snackbar-close"
              onClick={() => this.close()}
            ></bal-close>
          </div>
        </div>
        {this.action ? (
          <div class={{ ...buttonWrapperEl.class() }}>
            <bal-button
              color="info"
              size="small"
              href={this.href}
              target={this.target}
              onClick={() => this.onActionHandler()}
              data-testid="bal-snackbar-action"
            >
              {this.action}
            </bal-button>
          </div>
        ) : (
          ''
        )}
      </Host>
    )
  }
}

let snackbarIds = 0
