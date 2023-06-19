import { Component, h, ComponentInterface, Host, Element, Prop, State, Watch, Listen } from '@stencil/core'
import { BEM } from '../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../utils/log'
import { BalMutationObserver, ListenToMutation } from '../../utils/mutation'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints } from '../../utils/breakpoints'
import { BalResizeObserver, ListenToResize } from '../../utils/resize'
import { NavMetaLinkItem } from './models/bal-nav-meta-link-item'
import { NavMetaButton } from './models/bal-nav-meta-button'
import { NavLinkItemObserver } from './models/bal-nav-link-item'
import { BalScrollHandler } from '../../utils/scroll'

@Component({
  tag: 'bal-nav',
  styleUrls: {
    css: 'bal-nav.sass',
  },
})
export class NavMetaBar
  implements
    ComponentInterface,
    Loggable,
    BalResizeObserver,
    BalBreakpointObserver,
    BalMutationObserver,
    NavLinkItemObserver
{
  private navId = `bal-nav-${NavIds++}`
  private bodyScrollHandler = new BalScrollHandler()
  private menuBarEl: HTMLBalNavMenuBarElement | undefined

  @Element() el!: HTMLElement

  log!: LogInstance

  @State() isTouch = false
  @State() isDesktop = false
  @State() isFlyoutActive = false
  @State() activeMetaLink?: string
  @State() activeMenuLink?: string

  @Logger('bal-nav')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines content width of the stage
   */
  @Prop() containerSize: BalProps.BalNavContainer = 'default'

  /**
   * Link level structure.
   */
  @Prop() options: BalProps.BalNavOptions = []

  @State() linkItems: NavMetaLinkItem[] = []

  @Watch('options')
  protected async optionChanged() {
    this.onOptionChange()
  }

  /**
   * Link level structure.
   */
  @Prop() buttons: BalProps.BalNavMetaButtons = []

  @State() metaButtons: NavMetaButton[] = []

  @Watch('buttons')
  protected async buttonChanged() {
    this.onOptionChange()
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.bodyScrollHandler.connect()
  }

  componentWillLoad() {
    this.onOptionChange()
  }

  disconnectedCallback() {
    this.bodyScrollHandler.disconnect()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('balChange')
  listenToPopupChanges(event: BalEvents.BalPopupChange) {
    const target = event.target
    if (target && target.nodeName === 'BAL-POPUP') {
      const id = target.id
      const triggers = Array.from(this.el.querySelectorAll<HTMLBalButtonElement>(`[bal-popup="${id}"]`))
      if (event.detail === true) {
        this.onPopupOpen(triggers)
      } else {
        this.onPopupClose(triggers)
      }
    }
  }

  @Listen('click', { target: 'document', passive: true })
  async clickOnOutside(ev: UIEvent) {
    if (this.isDesktop) {
      if (!this.menuBarEl?.querySelector('.container')?.contains(ev.target as Node) && this.isFlyoutActive) {
        this.isFlyoutActive = false
      }
    }
  }

  mutationObserverActive = true

  @ListenToMutation({ tags: ['bal-popup'] })
  mutationListener(): void {
    this.onOptionChange()
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isTouch = breakpoints.touch
    this.isDesktop = breakpoints.desktop
  }

  @ListenToResize()
  resizeListener() {
    // empty
  }

  linkItemClickListener(item: any) {
    switch (item.type) {
      case 'NavMetaLinkItem':
        this.activeMetaLink = item.value
        break
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onOptionChange = async () => {
    this.linkItems = this.options.map(option => new NavMetaLinkItem(option, this))
    this.metaButtons = this.buttons.map(button => new NavMetaButton(button, this))
  }

  private onTouchToggleFlyout = (_ev: MouseEvent) => {
    this.isFlyoutActive = !this.isFlyoutActive
    if (this.isFlyoutActive) {
      this.bodyScrollHandler.disable()
    } else {
      this.bodyScrollHandler.enable()
    }
  }

  private onPopupOpen = (triggers: HTMLBalButtonElement[]) => {
    triggers.forEach(trigger => {
      if (trigger.classList.contains('bal-nav__popup--desktop')) {
        trigger.inverted = false
      } else if (trigger.classList.contains('bal-nav__popup--touch-bottom')) {
        trigger.color = 'primary'
      }
    })
  }

  private onPopupClose = (triggers: HTMLBalButtonElement[]) => {
    triggers.forEach(trigger => {
      if (trigger.classList.contains('bal-nav__popup--desktop')) {
        trigger.inverted = true
      } else if (trigger.classList.contains('bal-nav__popup--touch-bottom')) {
        trigger.color = 'info'
      }
    })
  }

  private onMetaBarTabChange = (ev: BalEvents.BalTabsChange): void => {
    this.activeMetaLink = ev.detail
    console.log(ev, this.activeMetaLink)
  }

  private onMenuBarTabChange = (value?: string): void => {
    if (this.activeMenuLink === value) {
      this.isFlyoutActive = !this.isFlyoutActive
    } else {
      this.isFlyoutActive = true
    }
    this.activeMenuLink = value
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('nav')
    const flyoutBlock = block.element('flyout')

    return (
      <Host
        id={this.navId}
        role="navigation"
        class={{
          ...block.class(),
        }}
      >
        {/*
          Desktop Variant
          ----------------------------
        */}
        <div class="bal-nav-meta-bar-transform">
          {this.isDesktop ? (
            <bal-nav-meta-bar variant="primary" size="small" position="sticky-top">
              <bal-stack space="auto">
                <bal-tabs spaceless inverted context="meta" onBalChange={ev => this.onMetaBarTabChange(ev)}>
                  {this.linkItems.map(item => item.render())}
                </bal-tabs>
                <bal-stack space="x-small" fit-content>
                  {this.metaButtons.map(button => button.renderAtMetaBar())}
                </bal-stack>
              </bal-stack>
            </bal-nav-meta-bar>
          ) : (
            ''
          )}
          {this.isDesktop ? (
            <bal-nav-menu-bar position="fixed-top" ref={menuBarEl => (this.menuBarEl = menuBarEl)}>
              <bal-stack space="auto" space-row="none" use-wrap>
                <bal-logo></bal-logo>
                <bal-tabs context="navigation" accordion spaceless>
                  {this.linkItems
                    .find(item => item.value === this.activeMetaLink)
                    ?.mainLinkItems.map(item =>
                      item.render({
                        onClick: () => this.onMenuBarTabChange(item.value),
                      }),
                    )}
                </bal-tabs>
              </bal-stack>
              {this.isFlyoutActive ? <bal-nav-menu-flyout>Flyout</bal-nav-menu-flyout> : ''}
              {/* <section>
                  <bal-nav-link href="https://google.com" variant="overview">
                    Alle Versicherungslösungen
                  </bal-nav-link>
                  <br />
                  <bal-nav-link variant="title">Wohnen & Recht</bal-nav-link>
                  <bal-nav-link href="https://google.com">Haushaltsversicherung</bal-nav-link>
                  <bal-nav-link href="https://google.com" selected>
                    Haftpflicht
                  </bal-nav-link>
                  <bal-nav-link href="https://google.com">Einzel Gegenstände vom Handy bis zum e-Bike</bal-nav-link>
                  <bal-nav-link href="https://google.com">
                    Cyber-Versicherung (Kreditkartenmissbrauch, Cyber-Mobbing, Schadsoftware)
                  </bal-nav-link>
                  <bal-nav-link href="https://google.com">Rechtsschutz</bal-nav-link>
                </section>
                <br />
                <section data-testid="with-title-link">
                  <bal-nav-link variant="title" href="https://google.com">
                    Wohneigentum
                  </bal-nav-link>
                  <bal-nav-link href="https://google.com">Gebäudeversicherung</bal-nav-link>
                  <bal-nav-link href="https://google.com">Erdbebenversicherung</bal-nav-link>
                  <bal-nav-link clickable>Bauversicherung</bal-nav-link>
                </section> */}
            </bal-nav-menu-bar>
          ) : (
            ''
          )}
        </div>
        {/*
          Touch Variant
          ----------------------------
        */}
        {this.isTouch ? (
          <bal-nav-meta-bar variant="white" size="normal">
            <bal-stack space="auto">
              <bal-logo></bal-logo>
              <bal-stack space="x-small" fit-content>
                {this.metaButtons.map(button => button.renderAtTouchTopMetaBar())}
                <bal-button
                  square
                  color={this.isFlyoutActive ? 'primary' : 'light'}
                  icon={this.isFlyoutActive ? 'close' : 'menu-bars'}
                  onClick={ev => this.onTouchToggleFlyout(ev)}
                ></bal-button>
              </bal-stack>
            </bal-stack>
          </bal-nav-meta-bar>
        ) : (
          ''
        )}
        {this.isTouch && this.isFlyoutActive ? (
          <div class={{ ...flyoutBlock.class() }}>
            <div class="container">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque reiciendis necessitatibus similique
              aspernatur laudantium odio, doloremque esse sapiente veniam, atque provident eos? Laudantium repudiandae
              consequuntur voluptatum. Debitis consectetur ad dolore. Reiciendis id saepe, illum in porro tenetur velit,
              aperiam tempore corrupti sit exercitationem dolor. Dolores sequi a maiores ea, aliquid, rem explicabo,
              obcaecati neque natus laudantium vero eaque voluptatibus illo. Ducimus enim quae recusandae esse commodi
              sit minima libero debitis. Debitis soluta quaerat pariatur dignissimos tempora autem nostrum, porro quia
              excepturi atque saepe modi ab. Sit quidem sed veritatis reprehenderit! Qui nobis enim dolorem, harum totam
              consequatur quibusdam itaque voluptatem exercitationem fugit eos non libero quasi, expedita aspernatur,
              earum animi. Inventore optio doloremque numquam dolorem labore blanditiis dignissimos, quos quisquam?
              Repudiandae, odit, dolores consequuntur numquam maxime sequi voluptas quasi rem dolor ex suscipit animi
              quae ratione velit dignissimos vel architecto autem minus sint odio! Voluptatem dolore pariatur quia
              doloremque velit. Facilis temporibus neque ad, quam aperiam omnis officiis quidem dicta delectus ducimus
              dolores saepe blanditiis nobis consequuntur at praesentium dolore quae! Dolor quidem quibusdam laudantium
              quae sit earum praesentium minima. Veritatis sequi molestias numquam reiciendis labore commodi nisi non
              magnam velit, ea laudantium eos quas iure sed ullam quisquam cupiditate harum repellendus natus. Velit,
              molestias ipsum quod sint perspiciatis nisi! Iste modi aperiam, nesciunt voluptatem quidem quos asperiores
              animi, excepturi nulla distinctio voluptate molestias debitis? Rem aliquam excepturi corporis neque
              nesciunt fugit similique sed quidem illum et quae, perferendis necessitatibus! Quae esse iste odio, harum
              tempora pariatur nisi iusto veritatis. Aliquid, voluptate. Voluptates nihil, excepturi delectus
              voluptatibus perspiciatis dolore esse ullam molestias unde dolores illum cumque! Ullam doloremque dolores
              repellendus. Doloribus in ad aut, quaerat suscipit, odit facere laborum minus unde est sapiente adipisci
              sint exercitationem, quasi tenetur placeat qui ab veniam assumenda dolor nemo quibusdam nam deserunt
              repellat. Eveniet. Et illum vel cupiditate porro quibusdam? Reprehenderit similique asperiores repellat
              magnam qui, sed omnis adipisci libero voluptas in assumenda nesciunt rerum perspiciatis minima autem neque
              rem necessitatibus! Velit, neque aspernatur! Repudiandae iste architecto facere aliquam nihil, laboriosam
              nobis explicabo, quam repellat, id labore. Sed consequatur vero, dolorum delectus magnam quam cum dicta
              cupiditate, iure quos neque molestias fugit, ipsa recusandae. Suscipit modi corporis commodi ea minus
              dolor nostrum beatae veritatis, ipsam eos cumque et vero quas, odit quam! Sed itaque alias minus
              voluptatem non corporis eveniet. Placeat nobis ipsa excepturi! Nostrum, vitae dolores eaque sit blanditiis
              ipsum libero cupiditate saepe veniam magnam, distinctio exercitationem magni. Dicta sapiente reprehenderit
              iure illo excepturi, nobis aut! Sed corporis autem quia quis. Quo, possimus. Quibusdam quaerat iste
              impedit itaque, obcaecati accusamus placeat iure omnis molestiae, vero voluptate aliquid! Deserunt
              laboriosam vitae enim ex molestias eligendi voluptatibus iste quisquam sunt, modi culpa asperiores
              exercitationem aperiam. Rerum reprehenderit molestiae distinctio ad, vero labore in est. Expedita iste,
              possimus magnam, tenetur illum esse error modi repudiandae consequatur dignissimos animi earum incidunt
              aliquid odit reprehenderit recusandae dolor. Ducimus. Numquam aliquam nostrum impedit consequuntur
              molestias possimus debitis excepturi dicta provident a laborum, fugiat voluptates porro reiciendis non,
              quia totam nemo consectetur error, odio magni atque? Optio tempore aliquid explicabo. Dicta, labore
              laudantium odio autem ex corporis sed culpa! Sint, veniam. Esse excepturi, temporibus asperiores ea
              corporis vero dolore explicabo culpa facere delectus quisquam repellat, officia eum voluptatibus
              blanditiis debitis. Enim a dolore, fugiat ut dicta quos itaque ullam! Tempore doloremque nemo hic ipsam
              nulla id assumenda distinctio, at, animi eligendi facilis ab commodi quibusdam repellat dicta error non
              labore. Similique unde tempore provident nobis eligendi saepe assumenda repellat dignissimos, dolorem in
              totam nemo beatae. Odit fuga vel nihil adipisci architecto maxime quae, consectetur ipsa sit, alias saepe
              hic. Odio. Velit necessitatibus labore, in expedita quia ad qui. Eveniet cumque voluptatum corporis
              possimus minima ut rem ea, aut ab magni voluptate corrupti asperiores, distinctio repellat fugiat iusto!
              Illum, repellendus ab. Sequi perferendis culpa itaque? Odit officia porro doloribus, eaque necessitatibus
              molestias earum, voluptates, ullam cumque alias fuga sapiente. Totam nemo saepe consequuntur molestias
              cumque atque veniam eligendi perspiciatis, mollitia quis! Repudiandae, mollitia quod beatae aperiam enim
              quisquam, soluta sed, dicta adipisci non eaque laudantium! Eius explicabo reprehenderit odit a, iusto quae
              commodi aliquam ullam asperiores aut veritatis at nemo voluptatibus! Nostrum ullam neque mollitia nisi,
              excepturi atque deserunt inventore similique temporibus, ad quia suscipit nemo aut a nulla itaque.
              Architecto consequatur libero vel aspernatur enim distinctio consequuntur debitis exercitationem unde?
              Tenetur debitis ullam soluta cumque! Ducimus, exercitationem delectus voluptas corporis deserunt molestias
              similique mollitia libero quis nulla accusamus quas, perspiciatis consequuntur ipsa, quia voluptate quos
              praesentium aliquid officiis. Modi, natus. Temporibus in nemo a expedita earum ullam voluptatum similique,
              minus sed aspernatur eligendi consequuntur quos quas ut aut ex dolore ab inventore delectus cum doloribus
              facere! Soluta repudiandae praesentium vitae! Minima animi harum autem vel quia atque quas modi. Doloribus
              libero quasi nihil excepturi saepe cum assumenda ratione blanditiis ipsa, iure hic esse, suscipit autem
              mollitia. Quam deleniti molestias molestiae. Non quam praesentium assumenda asperiores quas optio ex illum
              id aspernatur incidunt hic quo enim fugiat at, voluptatum eos perferendis, eligendi tempore rem
              dignissimos. Perferendis ad autem possimus explicabo? Unde. Obcaecati consectetur totam fugiat eius alias
              voluptatum aliquid, odio cumque hic, sit modi, expedita asperiores voluptate! Iusto perspiciatis maiores
              amet reprehenderit, rerum doloremque quisquam quibusdam, quas repellat quae eius iste. Ad quis rerum,
              placeat aspernatur aliquid delectus fugiat fugit? Eius quibusdam, non accusamus corporis tempora
              praesentium ea nam? Fugiat, quia. Rerum, adipisci harum officia maiores quo fugit voluptate et ea? Fuga
              rem voluptatum assumenda, numquam corporis magnam autem. Neque quas sunt accusantium eligendi. Voluptas
              harum atque, ex, dolorum delectus quasi, ad illo nisi odit accusamus fugiat veniam. Maxime, aut animi?
              Quibusdam voluptas sed voluptatibus maxime doloribus labore molestiae, reiciendis ratione placeat fuga
              alias non nulla id dolore iste tempora libero! Harum ipsa soluta ad distinctio tempora pariatur inventore,
              omnis animi. Aspernatur id voluptatem consequatur dignissimos, laborum corrupti officiis placeat facere
              ea, eius dolorum quam magni neque repellendus sapiente. Consequatur earum a doloribus numquam cum ab
              cupiditate illum, aliquid rerum adipisci! Impedit iusto, enim itaque quam voluptate sed nemo obcaecati
              nisi possimus cumque accusamus a? Non debitis provident voluptate, accusantium placeat obcaecati
              recusandae officia voluptatem sequi reprehenderit beatae magnam id. Minima.
            </div>
          </div>
        ) : (
          ''
        )}
        {this.isTouch && this.isFlyoutActive ? (
          <bal-nav-meta-bar variant="grey" size="normal">
            <bal-stack space="x-small" align="center">
              {this.metaButtons.map(button => button.renderAtTouchBottomMetaBar())}
            </bal-stack>
          </bal-nav-meta-bar>
        ) : (
          ''
        )}
        <div>
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let NavIds = 0
