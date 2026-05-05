import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance, ValidateEmptyOrOneOf, ValidateEmptyOrType, setupValidation } from '@utils'
import {
  ACCORDION_MARKERS,
  ACCORDION_MARKER_POSITIONS,
  type AccordionMarker,
  type AccordionMarkerPosition,
  type AccordionToggleDetail,
} from '../../accordion/accordion.interfaces'
import { BUTTON_TARGETS, type ButtonTarget, type ButtonClickDetail } from '../../button/button.interfaces'
import { DsComponentInterface } from '@global'
import {
  ITEM_VARIANTS,
  ITEM_ACTION_ICONS,
  ITEM_LABEL_LEVELS,
  ITEM_LABEL_SIZES,
  type ItemVariant,
  type ItemActionIcon,
  type ItemLabelLevel,
  type ItemLabelSize,
} from './item.interfaces'

type Attributes = {
  disabled?: boolean
  href?: string
  target?: string
  rel?: string
  download?: string
  onClick?: (event: MouseEvent) => void
}

/**
 * Item displays a list entry that supports plain content, accordion, link, and button variants with optional icon, label, and description slots.
 *
 * @slot icon - An optional icon to display on the left side of the item.
 * @slot content - The main content of the item, displayed next to the label and description.
 * @slot accordion-content - The content of the accordion, only applicable if `variant` is set to `accordion`.
 *
 * @part item - The main container of the item.
 * @part accordion - The accordion element, only applicable if `variant` is set to `accordion`.
 * @part accordion-content - The container of the accordion content, only applicable if `variant` is set to `accordion`.
 * @part label - The label element, only applicable if the `label` prop is set.
 * @part description - The description element, only applicable if the `description` prop is set.
 * @part action-icon - The action icon, only applicable if `variant` is set to `link` or `button`.
 */
@Component({
  tag: 'ds-item',
  styleUrl: 'item.host.scss',
  shadow: true,
})
export class Item implements DsComponentInterface {
  log!: LogInstance

  @Logger('item')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The name of the group the accordion belongs to. Accordions with the same group name will automatically
   * close when another accordion in the same group is opened.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly accordionGroup: string = ''

  /**
   * The marker variant. Only applies if `variant` is set to `accordion`.
   * If `''` the default marker is used, if `plus` a plus icon is used and if `plus-minus`
   * a plus icon for closed and a minus icon for open state is used.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...ACCORDION_MARKERS)
  readonly accordionMarker: AccordionMarker = ''

  /**
   * The position of the marker. Only applies if `variant` is set to `accordion`.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...ACCORDION_MARKER_POSITIONS)
  readonly accordionMarkerPosition: AccordionMarkerPosition = ''

  /**
   * If `true` the accordion is open.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly accordionOpen: boolean = false

  /**
   * The action icon variant. Controls which icon is displayed for `link` and `button` variants.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...ITEM_ACTION_ICONS)
  readonly actionIcon: ItemActionIcon = 'default'

  /**
   * The description text displayed below the label.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly description: string = ''

  /**
   * If `true`, the user cannot interact with the item.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly disabled: boolean = false

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly download: string = ''

  /**
   * Specifies the URL of the page the link goes to.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly href: string = ''

  /**
   * The label text displayed as a heading inside the item.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  /**
   * The semantic heading level of the label element.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...ITEM_LABEL_LEVELS)
  readonly labelLevel: ItemLabelLevel = 'h5'

  /**
   * The visual size of the label. Defaults to `labelLevel` if not set.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...ITEM_LABEL_SIZES)
  readonly labelSize: ItemLabelSize = ''

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly rel: string = ''

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...BUTTON_TARGETS)
  readonly target: ButtonTarget = '_self'

  /**
   * The visual and functional variant of the item.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...ITEM_VARIANTS)
  readonly variant: ItemVariant = 'default'

  /**
   * Emitted when the link element has clicked.
   */
  @Event() dsClick!: EventEmitter<ButtonClickDetail>

  /**
   * Emitted when the accordion is toggled.
   */
  @Event() dsAccordionToggle!: EventEmitter<AccordionToggleDetail>

  /**
   * Emitted when the accordion is opened.
   */
  @Event() dsAccordionOpened!: EventEmitter<AccordionToggleDetail>

  /**
   * Emitted when the accordion is closed.
   */
  @Event() dsAccordionClosed!: EventEmitter<AccordionToggleDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    setupValidation(this)
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  handleClick = (ev: MouseEvent) => {
    this.dsClick.emit(ev)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const ItemTag = this.variant === 'link' ? 'a' : this.variant === 'button' ? 'button' : 'div'

    const LabelTag = this.labelLevel ? this.labelLevel : 'h5'
    const labelSize = this.labelSize ? this.labelSize : this.labelLevel

    const hasActionIcon = this.variant === 'link' || this.variant === 'button'
    let actionIconName = ''
    if (hasActionIcon) {
      if (this.actionIcon === 'link') {
        actionIconName = 'nav-go-right'
      }

      if (this.actionIcon === 'link-external') {
        actionIconName = 'link'
      }

      if (this.actionIcon === 'download') {
        actionIconName = 'download'
      }

      if (this.actionIcon === 'default') {
        if (this.variant === 'link' || this.variant === 'button') {
          actionIconName = 'nav-go-right'
        }
      }
    }

    const attributes: Attributes = {}
    if (this.variant === 'link') {
      if (this.disabled) {
        attributes.disabled = this.disabled
      }
      if (this.href) {
        attributes.href = this.href
      }
      if (this.target) {
        attributes.target = this.target
      }
      if (this.rel) {
        attributes.rel = this.rel
      }
      if (this.download) {
        attributes.download = this.download
      }
    }

    if (this.variant === 'button') {
      if (this.disabled) {
        attributes.disabled = this.disabled
      } else {
        attributes.onClick = this.handleClick
      }
    }

    if (this.variant === 'accordion') {
      return (
        <Host
          role="listitem"
          class={{
            'is-disabled': this.disabled,
            'is-accordion': this.variant === 'accordion',
            [`has-label-${labelSize}`]: !!labelSize,
          }}
        >
          <ds-accordion
            part="accordion"
            {...attributes}
            group={this.accordionGroup}
            open={this.accordionOpen}
            marker={this.accordionMarker}
            marker-position={this.accordionMarkerPosition}
            onDsOpened={ev => {
              this.dsAccordionOpened.emit(ev.detail)
            }}
            onDsClosed={ev => {
              this.dsAccordionClosed.emit(ev.detail)
            }}
            onDsToggle={ev => {
              this.dsAccordionToggle.emit(ev.detail)
            }}
          >
            <div slot="summary" id="item" part="item">
              <slot name="icon"></slot>
              <div id="content">
                {this.label && (
                  <LabelTag id="label" part="label">
                    {this.label}
                  </LabelTag>
                )}
                {this.description && (
                  <p id="description" part="description">
                    {this.description}
                  </p>
                )}
                <slot name="content"></slot>
                <slot></slot>
              </div>
            </div>
            <div slot="content">
              <div id="accordion-content" part="accordion-content">
                <slot name="accordion-content"></slot>
              </div>
            </div>
          </ds-accordion>
        </Host>
      )
    }

    return (
      <Host
        role="listitem"
        class={{
          'is-disabled': this.disabled,
          'is-button': this.variant === 'button',
          'is-link': this.variant === 'link',
          [`has-label-${labelSize}`]: !!labelSize,
        }}
      >
        <ItemTag id="item" part="item" {...attributes}>
          <slot name="icon"></slot>
          <div id="content">
            {this.label && (
              <LabelTag id="label" part="label">
                {this.label}
              </LabelTag>
            )}
            {this.description && (
              <p id="description" part="description">
                {this.description}
              </p>
            )}
            <slot name="content"></slot>
            <slot></slot>
          </div>
          {hasActionIcon && <ds-icon name={actionIconName} part="action-icon"></ds-icon>}
        </ItemTag>
      </Host>
    )
  }
}
