import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import { inheritAttributes } from '../../utils/attributes'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({
  tag: 'ds-tag',
  styleUrl: 'tag.host.scss',
  shadow: true,
})
export class Tag implements Loggable {
  log!: LogInstance

  @Logger('tag')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  private inheritedAttributesClose: { [k: string]: any } = {}

  /**
   * The theme type of the tag.
   */
  @Prop({ reflect: true }) color?: DS.TagColor

  /**
   * The size of the tag element
   */
  @Prop({ mutable: true, reflect: true }) size?: DS.TagSize
  @Watch('size')
  watchSize(newValue: DS.TagSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * The shape of the tag element like square or pill
   */
  @Prop({ reflect: true }) shape?: DS.TagShape

  /**
   * The theme type of the tag.
   */
  @Prop({ reflect: true }) closable = false

  /**
   * Overwrites the default color to invalid style
   */
  @Prop({ reflect: true }) invalid = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop({ reflect: true }) disabled = false

  /**
   * Choosing left or center the tag is aligned to that side in the ds-card.
   */
  @Prop({ reflect: true }) position?: DS.TagPlacement

  /**
   * Emitted when the input got clicked.
   */
  @Event() dsCloseClick!: EventEmitter<DS.TagCloseClickDetail>

  connectedCallback(): void {
    this.size = normalizeDeprecatedTShirtSize(this.size)
  }

  componentWillLoad() {
    this.inheritedAttributesClose = inheritAttributes(this.el, ['tabindex'])
  }

  render() {
    return (
      <Host>
        <span part="label">
          <slot />
        </span>
        {this.closable && !this.disabled ? (
          <ds-close
            {...this.inheritedAttributesClose}
            onClick={(ev: MouseEvent) => this.dsCloseClick.emit(ev)}
          ></ds-close>
        ) : (
          ''
        )}
      </Host>
    )
  }
}
