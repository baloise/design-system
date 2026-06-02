import { Component, Element, Event, EventEmitter, Method, Prop, State, h, Host } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, sanitizeSvg, type LogInstance, type Loggable, ValidateEmptyOrType, setupValidation } from '@utils'
import {
  DsComponentInterface,
  DsConfigObserver,
  DsConfigState,
  DsLanguage,
  DsRegion,
  ListenToConfig,
  defaultConfig,
} from '@global'
import { FooterLanguageChangeDetail, FooterLink, FooterSocialLink } from './footer.interfaces'
import { i18nDsFooter } from './footer.i18n'

/**
 * Footer renders application level legal links, language selection, and social links.
 * Link content is slot first to keep links crawlable and SEO friendly.
 *
 * @slot - Main content area above the divider.
 * @slot logo - Optional custom logo markup.
 * @slot social-links - Optional social link anchors.
 * @slot links - Optional legal or app links.
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

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region
  @State() allowedLanguages: DsLanguage[] = defaultConfig.allowedLanguages

  /**
   * If `true` the language selection will be hidden.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly hideLanguageSelection: boolean = false

  /**
   * If `true` the legal links area will be hidden.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly hideLinks: boolean = false

  /**
   * Link target for the logo.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly logoHref: string = ''

  /**
   * Raw svg markup for a custom logo.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly logoSvg: string = ''

  /**
   * If `true` the social links area is shown.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly showSocialMedia: boolean = false

  /**
   * Optional generated links when no slotted links are provided.
   */
  @Prop()
  readonly overrideLinks: FooterLink[] | undefined = undefined

  /**
   * Optional generated social links when no slotted social links are provided.
   */
  @Prop()
  readonly socialLinks: FooterSocialLink[] | undefined = undefined

  /**
   * Copyright and address text below the divider.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly legalText: string = '© 2026 Helvetia Baloise Holding AG · Aeschengraben 21 · CH-4051 Basel'

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
    this.language = state.language
    this.region = state.region
    this.allowedLanguages = state.allowedLanguages
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

    if (this.logoSvg) {
      const logoContent = <span class="logo-svg" innerHTML={sanitizeSvg(this.logoSvg)}></span>
      return this.logoHref ? (
        <a class="logo-link" href={this.logoHref} aria-label="Home">
          {logoContent}
        </a>
      ) : (
        logoContent
      )
    }

    const logo = <ds-logo brand="baloise" color="white" />
    return this.logoHref ? (
      <a class="logo-link" href={this.logoHref} aria-label="Home">
        {logo}
      </a>
    ) : (
      logo
    )
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
            <a href={link.href} target={link.target} rel={link.rel} aria-label={link.ariaLabel || link.label}>
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
    const hasOverrideLinks = (this.overrideLinks?.length || 0) > 0
    const hasOverrideSocialLinks = (this.socialLinks?.length || 0) > 0

    const showLinks = !this.hideLinks && (hasLinksSlot || hasOverrideLinks)
    const showSocial = this.showSocialMedia || hasSocialSlot || hasOverrideSocialLinks

    return (
      <Host>
        <footer>
          <div class="top-row">
            <div class="logo-area">{this.renderLogo()}</div>

            {!this.hideLanguageSelection && (
              <label class="language-picker" aria-label={i18nDsFooter[this.language].languageSelector}>
                <ds-icon name="web" aria-hidden="true" />
                <select
                  data-testid="footer-language-select"
                  onInput={this.handleLanguageChange}
                  onChange={this.handleLanguageChange}
                >
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
            <p class="legal">{this.legalText}</p>

            {showSocial && (
              <nav class="social" aria-label="Social navigation">
                <slot name="social-links" />
                {!hasSocialSlot && hasOverrideSocialLinks && this.renderSocialList(this.socialLinks || [])}
              </nav>
            )}

            {showLinks && (
              <nav class="links" aria-label="Footer links">
                <slot name="links" />
                {!hasLinksSlot && hasOverrideLinks && this.renderLinkList(this.overrideLinks || [], 'link-list')}
              </nav>
            )}
          </div>
        </footer>
      </Host>
    )
  }
}
