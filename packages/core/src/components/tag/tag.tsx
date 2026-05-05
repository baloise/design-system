import { Component, Element, Event, EventEmitter, h, Host, Prop, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  inheritAttributes,
  normalizeDeprecatedTShirtSize,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import {
  TAG_COLORS,
  TAG_SHAPES,
  TAG_SIZES,
  TAG_PLACEMENTS,
  type TagColor,
  type TagSize,
  type TagShape,
  type TagPlacement,
  type TagCloseClickDetail,
} from './tag.interfaces'
import { DsComponentInterface } from '@global'

/**
 * Tag renders a compact label element for categorizing, filtering, or marking content with optional close button.
 *
 * @slot - The tag label text.
 * @part label - The tag content element.
 */
@Component({
  tag: 'ds-tag',
  styleUrl: 'tag.host.scss',
  shadow: true,
})
export class Tag implements DsComponentInterface {
  log!: LogInstance

  @Logger('tag')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  private inheritedAttributesClose: { [k: string]: any } = {}

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The theme type of the tag.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly closable: boolean = false

  /**
   * The theme type of the tag.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...TAG_COLORS)
  readonly color?: TagColor

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly disabled: boolean = false

  /**
   * Overwrites the default color to invalid style
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly invalid: boolean = false

  /**
   * Choosing left or center the tag is aligned to that side in the ds-card.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...TAG_PLACEMENTS)
  readonly position?: TagPlacement

  /**
   * The shape of the tag element like square or pill
   */
  @Prop()
  @ValidateEmptyOrOneOf(...TAG_SHAPES)
  readonly shape?: TagShape

  /**
   * The size of the tag element
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf(...TAG_SIZES)
  size?: TagSize
  @Watch('size')
  sizeChanged(newValue: TagSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Emitted when the input got clicked.
   */
  @Event() dsCloseClick!: EventEmitter<TagCloseClickDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    setupValidation(this)
    this.size = normalizeDeprecatedTShirtSize(this.size)
  }

  componentWillLoad() {
    this.inheritedAttributesClose = inheritAttributes(this.el, ['tabindex'])
  }

  componentWillUpdate() {
    setupValidation(this)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

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
