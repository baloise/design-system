import { Component, ComponentInterface, Element, h, Host, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { dsBrowser } from '../../utils/browser'
import {
  HEADING_COLORS,
  HEADING_ORDER,
  HEADING_SIZES,
  HEADING_TAGS,
  HeadingColor,
  HeadingSize,
  HeadingTag,
} from './heading.const'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({
  tag: 'ds-heading',
  styleUrl: 'heading.host.scss',
  shadow: true,
})
export class Heading implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('heading')
  createLogger(log: LogInstance) {
    this.log = log
  }

  private headingEl?: HTMLElement

  @Element() el!: HTMLStencilElement

  @State() autoFontSize?: HeadingSize

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The actual heading level used in the HTML markup.
   */
  @Prop({ reflect: true }) readonly level: DS.HeadingLevel = 'h1'

  @Watch('level')
  levelChanged() {
    this.updateAutoFontSize()
  }

  /**
   * Make the visual style mimic a specific heading level.
   * This option allows you to make e.g. h1 visually look like h3,
   * but still keep it h1 in the markup.
   */
  @Prop({ reflect: true }) readonly visualLevel?: DS.HeadingVisualLevel

  @Watch('visualLevel')
  visualLevelChanged() {
    this.updateAutoFontSize()
  }

  /**
   * The actual heading level used in the HTML markup.
   */
  @Prop({ reflect: true }) readonly autoLevel?: DS.HeadingVisualLevel

  @Watch('autoLevel')
  autoLevelChanged() {
    this.updateAutoFontSize()
  }

  /**
   * When true, the text will be truncated with a text overflow ellipsis instead of wrapping.
   * Please note that text overflow can only occur in block or inline-block level elements,
   * as these elements require a width to overflow.
   */
  @Prop({ reflect: true }) readonly noWrap: boolean = false

  /**
   * If `true` the heading gets displayed slimmer.
   */
  @Prop({ reflect: true }) readonly subtitle: boolean = false

  /**
   * Defines at which position the heading has spacing.
   */
  @Prop({ reflect: true }) readonly space?: 'none' | 'bottom' | 'top' | 'all'

  /**
   * The theme type of the toast.
   */
  @Prop({ reflect: true }) readonly color: DS.HeadingColor = ''

  /**
   * If `true` the color gets inverted for dark backgrounds
   */
  @Prop({ reflect: true }) readonly inverted: boolean = false

  /**
   * If `true` adds a text shadow to improve readability on image background
   * */
  @Prop({ reflect: true }) readonly shadow: boolean = false

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.updateAutoFontSize()
  }

  componentDidRender(): void {
    if (this.autoLevel && this.autoFontSize) {
      const rows = this.rows
      if (rows > 1) {
        const minSize = HEADING_SIZES[this.autoLevel]
        if (minSize !== this.autoFontSize) {
          const nextIndex = HEADING_ORDER.indexOf(this.autoFontSize) + 1
          this.autoFontSize = HEADING_ORDER[nextIndex]
        }
      }
    }
  }

  private updateAutoFontSize() {
    this.autoFontSize = this.fontSize
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get rows() {
    if (this.headingEl && dsBrowser.hasWindow) {
      const computedStyle = window.getComputedStyle(this.headingEl)
      const lineHeight = parseInt(computedStyle.lineHeight.slice(0, -2), 10)
      const height = this.headingEl.offsetHeight
      return height / lineHeight
    }
    return 1
  }

  private get fontColor(): HeadingColor {
    if (this.inverted) {
      return 'white'
    }
    return HEADING_COLORS[this.color]
  }

  private get fontSize(): HeadingSize {
    return HEADING_SIZES[this.visualLevel ? this.visualLevel : this.level]
  }

  private get tag(): HeadingTag {
    return HEADING_TAGS[this.level]
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const Heading = this.tag

    return (
      <Host
        class={{
          [`is-${this.autoFontSize}`]: this.autoFontSize !== undefined,
          [`is-${this.fontColor}`]: this.fontColor !== undefined,
        }}
      >
        <Heading id="heading" part="heading" ref={(headingEl: any) => (this.headingEl = headingEl)}>
          <slot />
        </Heading>
      </Host>
    )
  }
}
