import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import { raf, rOnLoad, Logger, type LogInstance, hasValue, OneOf, Type } from '@utils'
import {
  DsConfigObserver,
  DsConfigState,
  DsLanguage,
  DsRegion,
  defaultConfig,
  ListenToConfig,
  DsComponentInterface,
} from '@global'
import {
  SPINNER_COLORS,
  SPINNER_LABEL_POSITIONS,
  SPINNER_SIZES,
  SPINNER_VARIATIONS,
  SpinnerColor,
  SpinnerLabelPosition,
  SpinnerSize,
  SpinnerVariation,
} from './spinner.interfaces'
import { i18nDsSpinner } from './spinner.i18n'

type SpinnerAnimationFunction = (el: HTMLElement, color: string) => AnimationItem

/**
 * Spinner displays an animated loading indicator with customizable color, size, and variation.
 *
 * @part inner - The spinner animation container element.
 */
@Component({
  tag: 'ds-spinner',
  styleUrl: 'spinner.host.scss',
  shadow: true,
})
export class Spinner implements DsComponentInterface, DsConfigObserver {
  log!: LogInstance

  @Logger('spinner')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() animated = defaultConfig.animated
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  private animationItem!: AnimationItem
  private animationFunction?: SpinnerAnimationFunction
  private currentRaf: number | undefined
  private innerEl: HTMLDivElement | undefined

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * **Deprecated:** Use inverted="true" for white spinner instead.
   */
  @Prop()
  @OneOf(SPINNER_COLORS)
  readonly color: SpinnerColor = 'blue'

  /**
   * If `true` the component will not add the spinner animation svg
   */
  @Prop()
  @Type('boolean')
  readonly deactivated: boolean = false
  @Watch('deactivated')
  deactivatedChanged(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      if (this.deactivated) {
        this.destroy()
      } else {
        this.animate()
      }
    }
  }

  /**
   * If `true` the component can be used on dark background
   */
  @Prop()
  @Type('boolean')
  readonly inverted: boolean = false

  /**
   * Defines the size of the spinner. If `sm` the spinner is smaller.
   */
  @Prop({ mutable: true })
  @OneOf(SPINNER_SIZES)
  size: SpinnerSize = ''

  /**
   * **Deprecated:** Use size="sm" instead.
   */
  @Prop()
  @Type('boolean')
  readonly small: boolean = false

  /**
   * Visible label rendered next to the spinner. When omitted a translated aria-label is applied automatically.
   */
  @Prop()
  @Type('string')
  readonly label: string = ''

  /**
   * Position of the visible label relative to the spinner animation.
   */
  @Prop()
  @OneOf(SPINNER_LABEL_POSITIONS)
  readonly labelPosition: SpinnerLabelPosition = 'right'

  /**
   * Defines the look of the spinner
   */
  @Prop()
  @OneOf(SPINNER_VARIATIONS)
  readonly variation: SpinnerVariation = 'logo'
  @Watch('variation')
  variationChanged(newValue: SpinnerVariation, oldValue: SpinnerVariation) {
    if (newValue !== oldValue) {
      if (this.variation === 'circle') {
        this.destroy()
      } else {
        this.animate()
      }
    }
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentDidLoad() {
    if (this.variation === 'logo') {
      this.animate()
    } else {
      this.destroy()
    }
  }

  disconnectedCallback() {
    if (this.el && this.innerEl && !this.el.isConnected) {
      this.destroy()
    }
  }

  /**
   * PUBLIC LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.animated = state.animated
    this.language = state.language
    this.region = state.region
    if (state.animated === false) {
      this.destroy()
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private animate = async () => {
    if (!this.animated) {
      this.destroy()
      return
    }

    await this.load()

    if (this.currentRaf !== undefined) {
      cancelAnimationFrame(this.currentRaf)
    }

    if (this.shouldAnimate()) {
      this.destroy()
      this.currentRaf = raf(async () => {
        if (this.animationFunction && this.innerEl) {
          this.animationFunction(this.innerEl, this.getColor())
        }
      })
    }
  }

  private destroy = () => {
    if (this.animationItem && this.animationItem.destroy) {
      this.animationItem.destroy()
    }
    this.innerEl!.innerHTML = ''
  }

  private shouldAnimate = () => {
    if (this.variation !== 'logo') {
      return false
    }

    if (typeof (window as any) === 'undefined') {
      return false
    }

    if (this.animationFunction === undefined) {
      return false
    }

    return !this.deactivated
  }

  private load = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (this.animationFunction) {
        return resolve()
      } else {
        rOnLoad(async () => {
          import(/* @vite-ignore */ './spinner.animation')
            .then(module => {
              this.animationFunction = module.animate
              resolve()
            })
            .catch(reject)
        })
      }
    })
  }

  private getColor(): string {
    // Prefer a CSS custom property override if present on the host
    try {
      const cssVar = this.el ? getComputedStyle(this.el).getPropertyValue('--spinner-color').trim() : ''
      if (cssVar) {
        return cssVar
      }
    } catch {
      // Ignore errors, e.g. if getComputedStyle is not available
    }

    // Fallback to component props
    return this.inverted ? '#ffffff' : '#151f6d'
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const ariaLabel = this.label || i18nDsSpinner[this.language].loading

    let size = this.size
    if (this.small === true) {
      size = 'sm'
    }

    return (
      <Host
        role="progressbar"
        aria-label={ariaLabel}
        class={{
          'is-animated': this.animated,
          'is-circle': this.variation === 'circle',
          'is-sm': size === 'sm',
          'is-white': this.color === 'white',
          'is-label-right': hasValue(this.label) && this.labelPosition === 'right',
          'is-label-bottom': hasValue(this.label) && this.labelPosition === 'bottom',
        }}
      >
        <div>
          <div id="inner" part="inner" ref={el => (this.innerEl = el)}></div>
        </div>
        {hasValue(this.label) && <span part="label">{this.label}</span>}
      </Host>
    )
  }
}
