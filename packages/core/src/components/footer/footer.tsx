import { Component, Element, Event, EventEmitter, Method, Prop, State, h, Host } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance, type Loggable, ValidateEmptyOrType, setupValidation } from '@utils'
import {
  DsComponentInterface,
  DsConfigObserver,
  DsConfigState,
  DsLanguage,
  DsRegion,
  DsBrand,
  ListenToConfig,
  defaultConfig,
} from '@global'
import { FooterLanguageChangeDetail, FooterLink, FooterSocialLink } from './footer.interfaces'
import { i18nDsFooter } from './footer.i18n'

/**
 * Footer renders application level legal links, language selection, and social links.
 * Link content is slot first to keep links crawlable and SEO friendly.
 * Links and social media are shown by default unless disabled.
 *
 * @slot - Main content area above the divider.
 * @slot logo - Optional custom logo markup.
 * @slot social-links - Optional social link anchors (shows if provided or config available).
 * @slot links - Optional legal or app links (shows if provided or config available).
 */
@Component({
  tag: 'ds-footer',
  styleUrl: 'footer.host.scss',
  shadow: true,
})
export class Footer implements DsComponentInterface, DsConfigObserver {
  log!: LogInstance

  @Logger('footer')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  // ========================================================================
  // PUBLIC PROPERTY API
  // ========================================================================

  @State() brand: DsBrand = defaultConfig.brand
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region
  @State() allowedLanguages: DsLanguage[] = defaultConfig.allowedLanguages
  @State() legalLinksConfig: { [key in DsLanguage]?: FooterLink[] } | undefined
  @State() legalTextConfig: string | undefined
  @State() socialLinksConfig: FooterSocialLink[] | undefined

  /**
   * If `true` the language selection will be hidden.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly hideLanguageSelection: boolean = false

  /**
   * If `true` the default legal links from config will not be rendered.
   * User must provide links via the `links` slot.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly disableDefaultLinks: boolean = false

  /**
   * If `true` the default social links from config will not be rendered.
   * User must provide social links via the `social-links` slot.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly disableDefaultSocialLinks: boolean = false

  /**
   * Copyright and address text below the divider.
   * If not provided, uses the text from config based on region and language.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly legalText: string | undefined = undefined

  /**
   * Emitted when the language select value changes.
   */
  @Event() dsLanguageChange!: EventEmitter<FooterLanguageChangeDetail>

  // ========================================================================
  // LIFECYCLE
  // ========================================================================

  connectedCallback(): void {
    this.validateProps()
    setupValidation(this)
  }

  componentWillUpdate(): void {
    this.validateProps()
    setupValidation(this)
  }

  // ========================================================================
  // PROPERTY VALIDATION
  // ========================================================================

  private validateProps(): void {
    // Validation delegated to decorators and setupValidation(this)
  }

  // ========================================================================
  // PUBLIC METHODS
  // ========================================================================

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.brand = state.brand
    this.language = state.language
    this.region = state.region
    this.allowedLanguages = state.allowedLanguages
    this.legalLinksConfig = state.legalLinks?.[state.region]
    this.legalTextConfig = state.legalText?.[state.region]?.[state.language]
    this.socialLinksConfig = state.socialLinks?.[state.region]
  }

  // ========================================================================
  // PRIVATE METHODS
  // ========================================================================

  private hasNamedSlot(name: string): boolean {
    return this.el.querySelector(`[slot="${name}"]`) !== null
  }

  private getLanguageLabel(languageCode: DsLanguage): string {
    const labels = i18nDsFooter[this.language].languageLabels
    return labels[languageCode] || languageCode.toUpperCase()
  }

  private handleLanguageChange = (ev: Event): void => {
    const selectEl = ev.target as HTMLSelectElement
    const nextLanguage = selectEl.value
    this.language = nextLanguage as DsLanguage
    this.dsLanguageChange.emit({ language: nextLanguage })
  }

  private renderLogo() {
    if (this.hasNamedSlot('logo')) {
      return <slot name="logo" />
    }
    return <ds-logo brand={this.brand} color="white" />
  }

  private renderLinkList(links: FooterLink[], className: string) {
    return (
      <ul class={className}>
        {links.map(link => (
          <li key={`${link.href}-${link.label}`}>
            <a href={link.href} target={link.target} rel={link.rel}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    )
  }

  private renderSocialList(links: FooterSocialLink[]) {
    return (
      <ul class="social-list" aria-label="Social links">
        {links.map(link => (
          <li key={`${link.href}-${link.icon}`}>
            <a
              href={link.href}
              target={link.target}
              rel={link.rel}
              aria-label={link.ariaLabel || link.label}
              title={link.ariaLabel || link.label}
            >
              <ds-icon name={link.icon} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    )
  }

  // ========================================================================
  // RENDER
  // ========================================================================

  render() {
    const hasLinksSlot = this.hasNamedSlot('links')
    const hasSocialSlot = this.hasNamedSlot('social-links')
    const configLinks = !this.disableDefaultLinks && this.legalLinksConfig?.[this.language]
    const configSocial = !this.disableDefaultSocialLinks && this.socialLinksConfig
    const textToDisplay = this.legalText || this.legalTextConfig

    const showLinks = hasLinksSlot || (configLinks && configLinks.length > 0)
    const showSocial = hasSocialSlot || (configSocial && configSocial.length > 0)

    return (
      <Host>
        <footer>
          <div class="top-row">
            <div class="logo-area">{this.renderLogo()}</div>

            {!this.hideLanguageSelection && (
              <label class="language-picker" aria-label={i18nDsFooter[this.language].languageSelector}>
                <ds-icon name="web" aria-hidden="true" />
                <select data-testid="footer-language-select" onChange={this.handleLanguageChange}>
                  {this.allowedLanguages.map(languageCode => (
                    <option key={languageCode} value={languageCode} selected={this.language === languageCode}>
                      {this.getLanguageLabel(languageCode)}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          <div class="content">
            <slot />
          </div>

          <ds-divider space="sm" color="primary-light"></ds-divider>

          <div class="bottom-row">
            {textToDisplay && <p class="legal">{textToDisplay}</p>}

            {showSocial && (
              <nav class="social" aria-label="Social navigation">
                <slot name="social-links" />
                {!hasSocialSlot && configSocial && this.renderSocialList(configSocial)}
              </nav>
            )}

            {showLinks && (
              <nav class="links" aria-label="Footer links">
                <slot name="links" />
                {!hasLinksSlot && configLinks && this.renderLinkList(configLinks, 'link-list')}
              </nav>
            )}
          </div>
        </footer>
      </Host>
    )
  }
}
