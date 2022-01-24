import { FooterLink, Language, loadFooterLinks } from '@baloise/web-app-utils'
import { Component, Host, h, Prop, State, Watch } from '@stencil/core'

@Component({
  tag: 'bal-footer',
})
export class Footer {
  /**
   * If `true` the footer shows a track line at the bottom.
   */
  @Prop() hasTrackLine = false

  /**
   * The languages in which the links will appear.
   */
  @Prop() locale: 'en' | 'de' | 'fr' | 'it' = 'en'

  /**
   * If `true` the default Baloise links will be hidden.
   */
  @Prop() hideLinks = false

  @State() links: FooterLink[] = []

  connectedCallback() {
    this.updateFooterLinks()
  }

  @Watch('locale')
  watchLocaleHandler() {
    this.updateFooterLinks()
  }

  updateFooterLinks() {
    if (!this.hideLinks) {
      const allowedHosts = ['baloise.ch'] // Allowed origins to fetch footer links
      if (allowedHosts.some(allowedHost => location.hostname.endsWith(allowedHost))) {
        loadFooterLinks(new Language(this.locale)).then(links => (this.links = links))
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
