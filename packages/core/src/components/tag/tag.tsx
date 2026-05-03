import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import { inheritAttributes, normalizeDeprecatedTShirtSize, Logger, type LogInstance } from '@utils'
import {
  TAG_COLORS,
  TAG_SHAPES,
  TAG_SIZES,
  TAG_FONT_WEIGHTS,
  TAG_PLACEMENTS,
  type TagColor,
  type TagSize,
  type TagShape,
  type TagFontWeight,
  type TagPlacement,
  type TagCloseClickDetail,
} from './tag.interfaces'
import { DsComponentInterface } from '@global'

/**
 * Tag renders a compact label element for categorizing, filtering, or marking content with optional close button.
 *
 * @slot - The tag label text.
 * @part tag - The tag container element.
 * @part icon - The icon wrapper (if an icon is used).
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
   * The theme type of the tag.
   */
  @Prop({ reflect: true }) readonly color?: TagColor

  /**
   * The size of the tag element
   */
  @Prop({ mutable: true, reflect: true }) size?: TagSize
  @Watch('size')
  sizeChanged(newValue: TagSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * The shape of the tag element like square or pill
   */
  @Prop({ reflect: true }) readonly shape?: TagShape

  /**
   * The theme type of the tag.
   */
  @Prop({ reflect: true }) readonly closable: boolean = false

  /**
   * Overwrites the default color to invalid style
   */
  @Prop({ reflect: true }) readonly invalid: boolean = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * Choosing left or center the tag is aligned to that side in the ds-card.
   */
  @Prop({ reflect: true }) readonly position?: TagPlacement

  /**
   * Emitted when the input got clicked.
   */
  @Event() dsCloseClick!: EventEmitter<TagCloseClickDetail>

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
