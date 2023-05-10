import { Component, ComponentInterface, h, Host, Prop, Element, State, Watch } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import {
  HEADING_COLORS,
  HEADING_ORDER,
  HEADING_SIZES,
  HEADING_TAGS,
  HeadingColor,
  HeadingSize,
  HeadingTag,
} from './bal-heading.const'
import { balBrowser } from '../../../utils/browser'

@Component({
  tag: 'bal-heading',
  styleUrls: {
    css: 'bal-heading.sass',
  },
})
export class Heading implements ComponentInterface {
  private headingEl?: HTMLElement

  @Element() el?: HTMLElement

  @State() autoFontSize?: HeadingSize

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The actual heading level used in the HTML markup.
   */
  @Prop() level: BalProps.BalHeadingLevel = 'h1'

  @Watch('level')
  levelWatcher() {
    this.updateAutoFontSize()
  }

  /**
   * Make the visual style mimic a specific heading level.
   * This option allows you to make e.g. h1 visually look like h3,
   * but still keep it h1 in the markup.
   */
  @Prop() visualLevel?: BalProps.BalHeadingVisualLevel

  @Watch('visualLevel')
  visualLevelWatcher() {
    this.updateAutoFontSize()
  }

  /**
   * The actual heading level used in the HTML markup.
   */
  @Prop() autoLevel?: BalProps.BalHeadingVisualLevel

  @Watch('autoLevel')
  autoLevelWatcher() {
    this.updateAutoFontSize()
  }

  /**
   * When true, the text will be truncated with a text overflow ellipsis instead of wrapping.
   * Please note that text overflow can only occur in block or inline-block level elements,
   * as these elements require a width to overflow.
   */
  @Prop() noWrap = false

  /**
   * If `true` the heading gets displayed slimmer.
   */
  @Prop() subtitle = false

  /**
   * Defines at which position the heading has spacing.
   */
  @Prop() space?: 'none' | 'bottom' | 'top' | 'all'

  /**
   * The theme type of the toast.
   */
  @Prop() color: BalProps.BalHeadingColor = ''

  /**
   * If `true` the color gets inverted for dark backgrounds
   */
  @Prop() inverted = false

  /**
   * If `true` adds a text shadow to improve readability on image background
   * */
  @Prop() shadow = false

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
    if (this.headingEl && balBrowser.hasWindow) {
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
    const block = BEM.block('heading')
    const bemTextEl = block.element('text')

    const Heading = this.tag
    const fontColor = this.fontColor

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`space-${this.space}`).class(this.space !== undefined),
          ...block.modifier(`level-${this.level}`).class(),
        }}
      >
        <Heading
          class={{
            ...bemTextEl.class(),
            ...bemTextEl.modifier('no-wrap').class(this.noWrap),
            ...bemTextEl.modifier('subtitle').class(this.subtitle),
            ...bemTextEl.modifier('shadow').class(this.shadow),
            ...bemTextEl.modifier(`color-${fontColor}`).class(),
            [`is-size-${this.autoFontSize}`]: true,
          }}
          ref={(headingEl: any) => (this.headingEl = headingEl)}
          data-testid="bal-heading"
        >
          <slot />
        </Heading>
      </Host>
    )
  }
}
