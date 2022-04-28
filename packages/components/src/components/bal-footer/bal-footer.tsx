import { FooterLink, Language, loadFooterLinks } from '@baloise/web-app-utils'
import { Component, Host, h, Prop, State, Watch } from '@stencil/core'
import {
  BalConfigObserver,
  defaultConfig,
  BalConfigState,
  BalLanguage,
  detachComponentToConfig,
  attachComponentToConfig,
  updateBalLanguage,
} from '../../config'

@Component({
  tag: 'bal-footer',
})
export class Footer implements BalConfigObserver {
  @State() links: FooterLink[] = []
  @State() language: BalLanguage = defaultConfig.language
  @State() allowedLanguages: BalLanguage[] = defaultConfig.allowedLanguages

  /**
   * @deprecated The languages in which the links will appear.
   */
  @Prop() locale: 'en' | 'de' | 'fr' | 'it' | '' = ''

  /**
   * If `true` the legal Baloise links will be hidden.
   */
  @Prop() hideLinks = false

  /**
   * If `true` the language selection will be hidden.
   */
  @Prop() hideLanguageSelection = false

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  connectedCallback() {
    attachComponentToConfig(this)
    this.updateFooterLinks()
  }

  configChanged(config: BalConfigState) {
    this.language = config.language
    this.allowedLanguages = config.allowedLanguages
    this.updateFooterLinks()
  }

  @Watch('locale')
  watchLocaleHandler() {
    if (this.locale !== '') {
      this.language = this.locale
      this.updateFooterLinks()
    }
  }

  changeLanguage(language: BalLanguage) {
    updateBalLanguage(language)
  }

  updateFooterLinks() {
    if (!this.hideLinks) {
      const allowedHosts = ['baloise.ch', 'baloise.dev'] // Allowed origins to fetch footer links
      if (allowedHosts.some(allowedHost => location.hostname.endsWith(allowedHost))) {
        loadFooterLinks(new Language(this.language)).then(links => (this.links = links))
      } else {
        console.warn('Footer links can not be fetched from this origin.', location.hostname)
      }
    }
  }

  render() {
    return (
      <Host>
        <footer
          class={{
            footer: true,
          }}
        >
          <slot></slot>
          <div class="container footer-links-container">
            <div class="legal-links pt-4" style={{ display: this.hideLinks ? 'none' : 'flex' }}>
              {this.links.map(link => (
                <a class="is-link is-inverted pr-4" href={link.link}>
                  {link.label}
                </a>
              ))}
            </div>
            <div
              class="language-links pt-4"
              style={{
                display: this.hideLanguageSelection || this.allowedLanguages.length <= 1 ? 'none' : 'flex',
              }}
            >
              {this.allowedLanguages.map(lang => (
                <a
                  class={[
                    'is-link',
                    'is-inverted',
                    'pr-4',
                    this.language.toLowerCase() == lang.toLowerCase() ? 'is-current' : '',
                  ].join(' ')}
                  onClick={() => this.changeLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </Host>
    )
  }
}
