import { FooterLink, Language, loadFooterLinks, loadSocialMediaLinks, SocialMediaLink } from '@baloise/web-app-utils'
import { Component, Host, h, Prop, State, Method } from '@stencil/core'
import {
  BalConfigObserver,
  defaultConfig,
  BalConfigState,
  BalLanguage,
  ListenToConfig,
  updateBalLanguage,
  BalRegion,
} from '../../utils/config'
import { BEM } from '../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { rIC } from '../../utils/helpers'
import { stopEventBubbling } from '../../utils/form-input'

@Component({
  tag: 'bal-footer',
  styleUrl: 'bal-footer.sass',
})
export class Footer implements BalConfigObserver, Loggable {
  private selectEl: HTMLBalSelectElement | undefined;

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
    this.updateFooterLinks()
    this.updateSocialMediaLinks()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
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
                      onClick={(el)=> {
                        stopEventBubbling(el)
                        this.selectEl?.open()
                      }}
                    ></bal-icon>
                    <bal-select
                      ref={(el) => (this.selectEl = el as HTMLBalSelectElement)}
                      value={this.language}
                      onBalChange={event => this.changeLanguage(event.detail as any)}
                      data-testid="bal-footer-language"
                    >
                      {this.allowedLanguages.map(language => (
                        <bal-select-option key={language} label={language.toLocaleUpperCase()} value={language}>
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
                    key={link.link}
                    href={link.link}
                    target="_blank"
                    class={{
                      'link': true,
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
                    key={link.link}
                    href={link.link}
                    target="_blank"
                    class={{
                      'link': true,
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
