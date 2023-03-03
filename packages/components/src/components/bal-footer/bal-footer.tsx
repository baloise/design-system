import { FooterLink, Language, loadFooterLinks } from '@baloise/web-app-utils'
import { Component, Host, h, Prop, State, Watch, Method } from '@stencil/core'
import {
  BalConfigObserver,
  defaultConfig,
  BalConfigState,
  BalLanguage,
  detachComponentToConfig,
  attachComponentToConfig,
  updateBalLanguage,
  BalRegion,
} from '../../utils/config'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-footer',
  styleUrls: {
    css: 'bal-footer.sass',
  },
})
export class Footer implements BalConfigObserver {
  @State() links: FooterLink[] = []
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region
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

  /**
   * @internal define config for the component
   */
  @Method()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
    this.allowedLanguages = state.allowedLanguages
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
    if (!this.hideLinks && (this.region === 'CH' || this.region === 'DE')) {
      // The following footer links only apply to swiss and german applications
      loadFooterLinks(new Language(this.language), this.region).then(links => (this.links = links))
    }
  }

  render() {
    const block = BEM.block('footer')
    const elInner = block.element('inner')
    const elContainer = elInner.element('container')
    const elLinksContainer = elInner.element('links-container')
    const elLegalLinks = elLinksContainer.element('legal-links')
    const elLanguageLinks = elLinksContainer.element('language-links')

    return (
      <Host
        class={{
          ...block.class(),
        }}
      >
        <footer
          class={{
            ...elInner.class(),
          }}
        >
          <slot></slot>
          <div
            class={{
              container: true,
              ...elContainer.class(),
              ...elLinksContainer.class(),
            }}
          >
            <div
              class={{
                ...elLegalLinks.class(),
              }}
              style={{ display: this.hideLinks ? 'none' : 'flex' }}
            >
              {this.links.map(link => (
                <a
                  class={{
                    'is-link': true,
                    'is-inverted': true,
                  }}
                  href={link.link}
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div
              class={{
                ...elLanguageLinks.class(),
              }}
              style={{
                display: this.hideLanguageSelection || this.allowedLanguages.length <= 1 ? 'none' : 'flex',
              }}
            >
              {this.allowedLanguages.map(lang => (
                <a
                  class={[
                    'is-link',
                    'is-inverted',
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
