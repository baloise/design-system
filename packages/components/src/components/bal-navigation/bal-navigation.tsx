import { Component, h, ComponentInterface, Host, Element, State, Prop, Listen } from '@stencil/core'
import { LevelInfo } from './utils/level.utils'
import { BEM } from '../../utils/bem'
import { MutationHandler } from '../../utils/mutations'
import { ResizeHandler } from '../../utils/resize'
import { getPlatforms } from '../../utils/platform'

type NavigationBreakpoints = 'touch' | 'desktop' | 'highDefinition' | 'widescreen'

@Component({
  tag: 'bal-navigation',
  styleUrls: {
    css: 'bal-navigation.sass',
  },
})
export class Navigation implements ComponentInterface {
  @Element() el!: HTMLElement

  private mutationHandler = MutationHandler({ tags: ['bal-navigation-levels'] })
  private resizeWidthHandler = ResizeHandler()

  @State() levels: LevelInfo[] = []
  @State() breakpoints: NavigationBreakpoints = 'widescreen'

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines if the animation should be active
   */
  @Prop() logoAnimated = true
  /**
   * Path to the logo-image
   */
  @Prop() logoPath = '/'
  /**
   * Aria label for the meta-navigation-wrapper
   */
  @Prop() ariaLabelMeta = ''
  /**
   * Aria label for the main-navigation-wrapper
   */
  @Prop() ariaLabelMain = ''
  /**
   * Defines the initially active meta-navigation-item
   */
  @Prop() metaValue?: string

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  async connectedCallback() {
    this.updateBreakpoints()
    await this.readSubLevels()
    this.mutationHandler.connect(this.el, () => this.readSubLevels())
  }

  componentWillLoad() {
    this.updateBreakpoints()
  }

  disconnectedCallback() {
    this.mutationHandler.disconnect()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('resize', { target: 'window' })
  async resizeListener() {
    this.resizeWidthHandler(() => this.updateBreakpoints())
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateBreakpoints = () => {
    const platforms = getPlatforms()
    let newBreakpoint: NavigationBreakpoints = 'desktop'
    if (platforms.includes('touch')) {
      newBreakpoint = 'touch'
    } else if (platforms.includes('highDefinition')) {
      newBreakpoint = 'highDefinition'
    } else if (platforms.includes('widescreen')) {
      newBreakpoint = 'widescreen'
    } else if (platforms.includes('fullhd')) {
      newBreakpoint = 'widescreen'
    } else {
      newBreakpoint = 'desktop'
    }

    if (this.breakpoints !== newBreakpoint) {
      this.breakpoints = newBreakpoint
    }
  }

  private async readSubLevels() {
    const levelEl = this.el.querySelector('bal-navigation-levels')
    const levels = await levelEl?.getLevelInfos()
    if (levels) {
      this.levels = levels
    }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const navigationEl = BEM.block('nav')

    return (
      <Host
        class={{
          ...navigationEl.class(),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
