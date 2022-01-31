import { FooterLink, Language, loadFooterLinks } from '@baloise/web-app-utils'
import { Component, Host, h, Prop, State, Watch } from '@stencil/core'
import { BaloiseDesignSystemConfig } from '../..'
import { balConfigStore } from '../../config/config.store'
import { BalConfigState, BalLanguage } from '../../config/config.types'
import { BalConfigObserver } from '../../config/observable/observer'

@Component({
  tag: 'bal-footer',
})
export class Footer implements BalConfigObserver {
  @State() links: FooterLink[] = []
  @State() language: BalLanguage = BaloiseDesignSystemConfig.language

  /**
   * If `true` the footer shows a track line at the bottom.
   */
  @Prop() hasTrackLine = false

  /**
   * @deprecated The languages in which the links will appear.
   */
  @Prop() locale: 'en' | 'de' | 'fr' | 'it' | '' = ''

  /**
   * If `true` the default Baloise links will be hidden.
   */
  @Prop() hideLinks = false

  disconnectedCallback() {
    balConfigStore.detach(this)
  }

  connectedCallback() {
    balConfigStore.attach(this)
    this.updateFooterLinks()
  }

  configChanged(config: BalConfigState) {
    this.language = config.language
    this.updateFooterLinks()
  }

  @Watch('locale')
  watchLocaleHandler() {
    if (this.locale !== '') {
      this.language = this.locale
      this.updateFooterLinks()
    }
  }

  updateFooterLinks() {
    if (!this.hideLinks) {
      const allowedHosts = ['baloise.ch'] // Allowed origins to fetch footer links
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
            'footer': true,
            'has-track-line': this.hasTrackLine,
          }}
        >
          <slot></slot>
          <div class="footer-links-container p-1" style={{ display: this.hideLinks ? 'none' : 'block' }}>
            {this.links.map(link => (
              <a class="is-link is-inverted pr-4" href={link.link}>
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </Host>
    )
  }
}
