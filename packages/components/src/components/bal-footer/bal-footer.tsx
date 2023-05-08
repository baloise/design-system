import { FooterLink, Language, loadFooterLinks, loadSocialMediaLinks, SocialMediaLink } from '@baloise/web-app-utils'
import { Component, Host, h, Prop, State, Method } from '@stencil/core'
import {
  BalConfigObserver,
  defaultConfig,
  BalConfigState,
  BalLanguage,
  detachComponentToConfig,
  attachComponentToConfig,
  updateBalLanguage,
  BalRegion,
} from '@/components/utils/config'
import { BEM } from '@/components/utils/bem'
import { Loggable, Logger, LogInstance } from '@/components/utils/log'
import { rIC } from '@/components/utils/helpers'

@Component({
  tag: 'bal-footer',
  styleUrls: {
    css: 'bal-footer.sass',
  },
})
export class Footer implements BalConfigObserver, Loggable {
  @State() links: FooterLink[] = []
  @State() socialMediaLinks: SocialMediaLink[] = []
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region
  @State() allowedLanguages: BalLanguage[] = defaultConfig.allowedLanguages

  log!: LogInstance

  @Logger('bal-footer')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the legal Baloise links will be hidden.
   */
  @Prop() hideLinks = false

  /**
   * If `true` the social media links will be shown.
   */
  @Prop() showSocialMedia = false

  /**
   * If `true` the language selection will be hidden.
   */
  @Prop() hideLanguageSelection = false

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    attachComponentToConfig(this)
    this.updateFooterLinks()
    this.updateSocialMediaLinks()
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  async configChanged(state: BalConfigState): Promise<void> {
    if (this.language !== state.language || this.region !== state.region) {
      this.language = state.language
      this.region = state.region
      this.allowedLanguages = state.allowedLanguages
      this.updateFooterLinks()
      this.updateSocialMediaLinks()
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private changeLanguage(language: BalLanguage) {
    updateBalLanguage(language)
  }

  private updateFooterLinks() {
    if (!this.hideLinks && (this.region === 'CH' || this.region === 'DE')) {
      // The following footer links only apply to swiss and german applications
      const region = this.region
      rIC(() => {
        loadFooterLinks(new Language(this.language), region).then(links => (this.links = links))
      })
    }
  }

  private updateSocialMediaLinks() {
    if (this.showSocialMedia && (this.region === 'CH' || this.region === 'DE')) {
      // The following footer links only apply to swiss and german applications
      const region = this.region
      rIC(() => {
        loadSocialMediaLinks(new Language(this.language), region).then(links => (this.socialMediaLinks = links))
      })
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('footer')
    const elInner = block.element('inner')
    const elInnerWrapper = elInner.element('wrapper')
    const elContainer = elInnerWrapper.element('container')
    const elLinksContainer = elInnerWrapper.element('links-container')
    const elHeaderContainer = elInnerWrapper.element('header-container')
    const elLogo = elHeaderContainer.element('logo')
    const elLanguage = elHeaderContainer.element('language')
    const elWrapper = elLanguage.element('wrapper')
    const elIcon = elLanguage.element('icon')
    const elLegalLinks = elLinksContainer.element('legal-links')
    const elSocialMediaLinks = elLinksContainer.element('social-media-links')

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
          <div
            class={{
              ...elInnerWrapper.class(),
            }}
          >
            <div
              class={{
                container: true,
                ...elContainer.class(),
                ...elHeaderContainer.class(),
              }}
            >
              <div
                class={{
                  ...elLogo.class(),
                }}
              >
                <bal-logo color="white"></bal-logo>
              </div>
              <div
                class={{
                  ...elLanguage.class(),
                }}
                style={{
                  display: this.hideLanguageSelection || this.allowedLanguages.length <= 1 ? 'none' : 'flex',
                }}
              >
                <div
                  class={{
                    ...elWrapper.class(),
                  }}
                >
                  <bal-input-group>
                    <bal-icon
                      class={{
                        ...elIcon.class(),
                      }}
                      name="web"
                      color="white"
                    ></bal-icon>
                    <bal-select
                      value={this.language}
                      onBalChange={event => this.changeLanguage(event.detail as any)}
                      data-testid="bal-footer-language"
                    >
                      {this.allowedLanguages.map(language => (
                        <bal-select-option label={language.toLocaleUpperCase()} value={language}>
                          {language.toLocaleUpperCase()}
                        </bal-select-option>
                      ))}
                    </bal-select>
                  </bal-input-group>
                </div>
              </div>
            </div>
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
                  ...elSocialMediaLinks.class(),
                }}
                style={{
                  display: !this.showSocialMedia ? 'none' : 'flex',
                }}
              >
                {this.socialMediaLinks.map(link => (
                  <a
                    href={link.link}
                    target="_blank"
                    class={{
                      'is-link': true,
                      'is-inverted': true,
                    }}
                  >
                    <bal-icon name={link.label.toLowerCase()}></bal-icon>
                  </a>
                ))}
              </div>
              <div
                class={{
                  ...elLegalLinks.class(),
                }}
                style={{ display: this.hideLinks ? 'none' : 'flex' }}
              >
                {this.links.map(link => (
                  <a
                    href={link.link}
                    target="_blank"
                    class={{
                      'is-link': true,
                      'is-light': true,
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </Host>
    )
  }
}
