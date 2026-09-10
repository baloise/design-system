import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  areArraysEqual,
  dsBrowser,
  dsDevice,
  debounce,
  rIC,
  rOnLoad,
  Logger,
  type LogInstance,
  OneOf,
  Type,
} from '@utils'
import {
  DsBrand,
  DsComponentInterface,
  DsConfigObserver,
  DsConfigState,
  DsLanguage,
  DsRegion,
  ListenToConfig,
  initializeDesignSystem,
  updateDsAllowedLanguages,
  updateDsAnimated,
  updateDsBrand,
  updateDsFallbackLanguage,
  updateDsLanguage,
  updateDsLogger,
  updateDsRegion,
} from '@global'
import { startFocusVisible } from './app.focus.util'

const APP_BRANDS: DsBrand[] = ['baloise', 'helvetia']
const APP_REGIONS: DsRegion[] = ['CH', 'DE', 'BE', 'LU', 'AT', 'ES', 'IT']

/**
 * App is a root wrapper component that provides global configuration, focus management, and responsive behavior context for all design system components.
 *
 * @slot - All content and child elements.
 * @part app - The app container element.
 */
@Component({
  tag: 'ds-app',
  styleUrl: 'app.scss',
})
export class App implements DsComponentInterface, DsConfigObserver {
  private focusVisible?: any
  private debouncedNotify = debounce(() => this.notifyResize(), 100)
  private lastConfigState?: DsConfigState

  @Element() el!: HTMLStencilElement

  log!: LogInstance

  @Logger('app')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * Disables all animation inside the ds-app. Can be used for simplify e2e testing.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly animated: boolean = true

  /**
   * Sets the active brand for all design system components. Falls back to the global config default when unset.
   */
  @Prop({ reflect: true })
  @OneOf(APP_BRANDS)
  readonly brand?: DsBrand

  /**
   * Sets the active region for all design system components. Falls back to the global config default when unset.
   */
  @Prop({ reflect: true })
  @OneOf(APP_REGIONS)
  readonly region?: DsRegion

  /**
   * Sets the active language for all design system components. Falls back to the global config default when unset.
   */
  @Prop({ reflect: true })
  @Type('string')
  readonly language?: DsLanguage

  /**
   * Comma separated list of languages the app allows selecting. Falls back to the global config default when unset.
   */
  @Prop({ reflect: true })
  @Type('string')
  readonly allowedLanguages?: string

  /**
   * Language used when `language` is not part of `allowedLanguages`. Falls back to the global config default when unset.
   */
  @Prop({ reflect: true })
  @Type('string')
  readonly fallbackLanguage?: DsLanguage

  @Watch('brand')
  protected brandChanged() {
    if (this.brand) {
      updateDsBrand(this.brand)
    }
  }

  @Watch('region')
  protected regionChanged() {
    if (this.region) {
      updateDsRegion(this.region)
    }
  }

  @Watch('fallbackLanguage')
  protected fallbackLanguageChanged() {
    if (this.fallbackLanguage) {
      updateDsFallbackLanguage(this.fallbackLanguage)
    }
  }

  @Watch('allowedLanguages')
  protected allowedLanguagesChanged() {
    if (this.allowedLanguages) {
      updateDsAllowedLanguages(this.allowedLanguages.split(',').map(lang => lang.trim()) as DsLanguage[])
    }
  }

  @Watch('language')
  protected languageChanged() {
    if (this.language) {
      updateDsLanguage(this.language)
    }
  }

  /**
   * @internal Is `true` when DS components are ready to be shown.
   */
  @Prop({ reflect: true, mutable: true })
  @Type('boolean')
  ready: boolean = false

  /**
   * @internal Comma separated list of components to log.
   */
  @Prop({ reflect: true })
  @Type('string')
  readonly logger: string = ''

  /**
   * Emitted when app is ready and painted.
   */
  @Event() dsAppReady!: EventEmitter<void>

  /**
   * Emitted when the `animated` value changes in the global config.
   */
  @Event() dsAnimatedChange!: EventEmitter<boolean>

  /**
   * Emitted when the `brand` value changes in the global config.
   */
  @Event() dsBrandChange!: EventEmitter<DsBrand>

  /**
   * Emitted when the `region` value changes in the global config.
   */
  @Event() dsRegionChange!: EventEmitter<DsRegion>

  /**
   * Emitted when the `language` value changes in the global config.
   */
  @Event() dsLanguageChange!: EventEmitter<DsLanguage>

  /**
   * Emitted when the `allowedLanguages` value changes in the global config.
   */
  @Event() dsAllowedLanguagesChange!: EventEmitter<DsLanguage[]>

  /**
   * Emitted when the `fallbackLanguage` value changes in the global config.
   */
  @Event() dsFallbackLanguageChange!: EventEmitter<DsLanguage>

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback() {
    if (dsBrowser.hasWindow && !(window as any).DesignSystem?.config) {
      initializeDesignSystem()
    }

    if (this.animated === false) {
      updateDsAnimated(this.animated)
    }

    if (this.logger) {
      updateDsLogger(this.logger.split(',').map(log => log.trim()))
    }

    if (dsBrowser.hasWindow) {
      window.addEventListener('resize', this.debouncedNotify)
      this.debouncedNotify()
    }
  }

  componentWillLoad() {
    this.brandChanged()
    this.regionChanged()
    this.fallbackLanguageChanged()
    this.allowedLanguagesChanged()
    this.languageChanged()
  }

  componentDidLoad() {
    rIC(() => {
      this.ready = true
      startFocusVisible()
    })

    rOnLoad(() => {
      if (dsBrowser.hasDocument && dsBrowser.hasWindow) {
        const doc = document.documentElement
        doc.classList.add('lcp-ready')
        this.dsAppReady.emit()
      }
    })
  }

  disconnectedCallback() {
    if (dsBrowser.hasWindow) {
      window.removeEventListener('resize', this.debouncedNotify)
    }
  }

  /**
   * PUBLIC METHODS
   * ─────────────────────────────────────────────────────
   */

  /**
   * Sets focus on the given elements using the app's focus-visible handling.
   */
  @Method()
  async setFocus(elements: HTMLElement[]) {
    if (this.focusVisible) {
      this.focusVisible.setFocus(elements)
    }
  }

  /**
   * @internal Notifies consumers when the global config changes.
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    const previous = this.lastConfigState
    this.lastConfigState = { ...state }

    if (!previous) {
      return
    }

    if (previous.animated !== state.animated) {
      this.dsAnimatedChange.emit(state.animated)
    }

    if (previous.brand !== state.brand) {
      this.dsBrandChange.emit(state.brand)
    }

    if (previous.region !== state.region) {
      this.dsRegionChange.emit(state.region)
    }

    if (previous.language !== state.language) {
      this.dsLanguageChange.emit(state.language)
    }

    if (!areArraysEqual(previous.allowedLanguages, state.allowedLanguages)) {
      this.dsAllowedLanguagesChange.emit(state.allowedLanguages)
    }

    if (previous.fallbackLanguage !== state.fallbackLanguage) {
      this.dsFallbackLanguageChange.emit(state.fallbackLanguage)
    }
  }

  /**
   * EVENT HANDLERS
   * ─────────────────────────────────────────────────────
   */

  notifyResize = async () => {
    if (dsBrowser.hasDocument && dsBrowser.hasWindow) {
      const doc = document.documentElement
      doc.style.setProperty('--ds-app-height', `${window.innerHeight}px`)
    }
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    return (
      <Host
        class={{
          'ds-app': true,
          'ds-app--safari': dsBrowser.isSafari,
          'ds-app--touch': dsDevice.hasTouchScreen,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
