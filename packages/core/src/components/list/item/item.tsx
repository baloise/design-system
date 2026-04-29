import { Component, Element, h, Host, Prop } from '@stencil/core'
import { Event, EventEmitter, HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance } from '@utils'
import { AccordionMarker, AccordionMarkerPosition, AccordionToggleDetail } from '../../accordion/accordion.interfaces'
import { ButtonTarget, ButtonClickDetail } from '../../button/button.interfaces'
import { DsComponentInterface } from '@global'

type Attributes = {
  disabled?: boolean
  href?: string
  target?: string
  rel?: string
  download?: string
  onClick?: (event: MouseEvent) => void
}

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

  @Prop() readonly variant: 'link' | 'button' | 'accordion' | 'default' = 'default'
  @Prop() readonly actionIcon: 'link' | 'link-external' | 'download' | 'default' = 'default'

  /**
   * If `true` the accordion is open.
   */
  @Prop() readonly accordionOpen: boolean = false

  /**
   * The name of the group the accordion belongs to. Accordions with the same group name will automatically
   * close when another accordion in the same group is opened.
   */
  @Prop() readonly accordionGroup: string = ''

  /**
   * The marker variant. Only applies if `button` is `false`.
   * If `''` the default marker is used, if `plus` a plus icon is used and if `plus-minus`
   * a plus icon for closed and a minus icon for open state is used.
   */
  @Prop() readonly accordionMarker?: AccordionMarker

  /**
   * The position of the marker. Only applies if `button` is `false`.
   */
  @Prop() readonly accordionMarkerPosition?: AccordionMarkerPosition

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() readonly href: string = ''

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop() readonly target: ButtonTarget = '_self'

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop() readonly rel: string = ''

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   */
  @Prop() readonly download: string = ''

  /**
   * If `true`, the user cannot interact with the button.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  @Prop() readonly label: string = ''
  @Prop() readonly labelLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' = 'h5'
  @Prop() readonly labelSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | '3xl' | '2xl' | 'xl' | 'lg' | 'base'

  @Prop() readonly description: string = ''

  /**
   * Emitted when the link element has clicked.
   */
  @Event() dsClick!: EventEmitter<ButtonClickDetail>

  /**
   * Emitted when the input value has changed.
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
        attributes.onClick = (ev: MouseEvent) => {
          this.dsClick.emit(ev)
        }
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
                {this.label && <LabelTag id="label">{this.label}</LabelTag>}
                {this.description && <p id="description">{this.description}</p>}
                <slot name="content"></slot>
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
            {this.label && <LabelTag id="label">{this.label}</LabelTag>}
            {this.description && <p id="description">{this.description}</p>}
            <slot name="content"></slot>
          </div>
          {hasActionIcon && <ds-icon name={actionIconName}></ds-icon>}
        </ItemTag>
      </Host>
    )
  }
}
