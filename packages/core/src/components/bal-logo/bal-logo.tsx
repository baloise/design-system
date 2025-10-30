import { Component, ComponentInterface, Element, FunctionalComponent, h, Host, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import { BEM } from '../../utils/bem'
import { BalBreakpointObserver, BalBreakpoints, balBreakpoints, ListenToBreakpoints } from '../../utils/breakpoints'
import { BalConfigObserver, BalConfigState, ListenToConfig } from '../../utils/config'
import { rOnLoad } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'

type LogoAnimationFunction = (el: HTMLElement, color: 'blue' | 'white') => AnimationItem

@Component({
  tag: 'bal-logo',
  styleUrl: 'bal-logo.sass',
})
export class Logo implements ComponentInterface, Loggable, BalBreakpointObserver, BalConfigObserver {
  private animationItem!: AnimationItem
  private animatedLogoElement!: HTMLDivElement
  private animationFunction?: LogoAnimationFunction

  log!: LogInstance

  @Logger('bal-logo')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() isTouch = balBreakpoints.isTouch
  @State() doesConfigAllowAnimation = true

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the color of the logo.
   */
  @Prop() color: BalProps.BalLogoColor = 'blue'

  /**
   * Size of the logo svg
   */
  @Prop() size: BalProps.BalLogoSize = ''

  /**
   * Defines if the animation should be active
   */
  @Prop() animated = false
  @Watch('animated')
  animatedWatcher() {
    if (!this.isAnimated) {
      this.destroyAnimation()
    }
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.animatedWatcher()
  }

  componentDidUpdate() {
    this.resetAnimation()
  }

  componentDidLoad() {
    this.resetAnimation()
  }

  disconnectedCallback() {
    if (this.el && !this.el.isConnected) {
      this.destroyAnimation()
    }
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isTouch = breakpoints.touch
  }

  @ListenToConfig()
  configChanged(state: BalConfigState): void {
    this.doesConfigAllowAnimation = state.animated
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private get isAnimated() {
    return this.doesConfigAllowAnimation && this.animated
  }

  private async resetAnimation() {
    this.destroyAnimation()
    if (this.animated) {
      await this.loadAnimation()

      if (this.animationFunction) {
        this.destroyAnimation()
        this.animationItem = this.animationFunction(this.animatedLogoElement, this.color)
      }
    }
  }

  private async loadAnimation(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.animationFunction) {
        return resolve()
      } else {
        rOnLoad(async () => {
          import(/* @vite-ignore */ './bal-logo.animation')
            .then(module => {
              this.animationFunction = module.animate
              resolve()
            })
            .catch(reject)
        })
      }
    })
  }

  private destroyAnimation() {
    if (this.animated && this.animationItem && this.animationItem.destroy) {
      this.animationItem.destroy()
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const logoBlock = BEM.block('logo')

    const AnimatedLogo: FunctionalComponent = () => {
      return (
        <div
          style={{
            width: this.isTouch ? '100px' : '158px',
            height: this.isTouch ? '22px' : '32px',
          }}
          ref={el => (this.animatedLogoElement = el as HTMLDivElement)}
        ></div>
      )
    }

    const LargeLogo: FunctionalComponent = () => {
      return (
        <svg
          focusable="false"
          aria-hidden="true"
          width="158"
          height="32"
          viewBox="0 0 158 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M112.351 3.52166C112.351 1.47065 114.09 0 116.118 0C118.146 0 119.727 1.47065 119.727 3.52166C119.727 5.57268 118.146 7.00945 116.118 7.00945C114.09 7.00945 112.351 5.57324 112.351 3.52166ZM113.231 9.43647H118.97V27.4547H113.231V9.43647ZM82.5903 2.46199H88.33V27.4541H82.5903V2.46199ZM48.3558 27.8995C53.6142 27.8995 57.3602 23.8647 57.3602 18.4631C57.3602 13.0609 53.7175 9.0266 48.4915 9.02715C46.5342 9.02715 44.8845 9.60807 43.5786 10.7022V2.46255H37.839V27.4547H43.132V25.9163C44.4378 27.1814 46.1908 27.8995 48.3558 27.8995ZM47.5312 14.02C49.9368 14.02 51.6893 15.8989 51.6893 18.4631C51.6893 21.0272 49.9368 22.8733 47.5312 22.8733C45.0224 22.8733 43.3034 21.0611 43.3034 18.4631C43.3034 15.8317 44.9877 14.02 47.5312 14.02ZM78.8057 27.4547V9.43647H73.5127V11.317C72.2409 10.0524 70.522 9.36815 68.2889 9.36815C63.0305 9.36815 59.2498 13.0614 59.2498 18.4631C59.2498 23.8647 63.0305 27.8995 68.2889 27.8995C70.5226 27.8995 72.2409 27.1464 73.5127 25.8135V27.4547H78.8057ZM69.114 14.02C71.6229 14.02 73.3072 15.83 73.3072 18.4631C73.3072 21.0617 71.6224 22.8733 69.114 22.8733C66.6744 22.8733 64.9554 21.0256 64.9554 18.4631C64.9554 15.9005 66.7084 14.02 69.114 14.02ZM100.74 9.02659C94.9667 9.02659 90.8422 13.0609 90.8422 18.463C90.8422 23.8308 94.9684 27.8995 100.74 27.8995C106.549 27.8995 110.673 23.8308 110.673 18.463C110.673 13.0609 106.546 9.02659 100.74 9.02659ZM100.774 14.0867C103.283 14.0867 104.899 15.8644 104.899 18.4286C104.899 21.0272 103.249 22.8389 100.774 22.8394C98.2656 22.8394 96.6159 20.9928 96.6159 18.463C96.6159 15.8639 98.2656 14.0867 100.774 14.0867ZM126.05 21.2666L121.307 23.0788C122.373 26.2267 125.294 27.8995 129.382 27.8962C134.159 27.8962 137.183 25.6397 137.183 21.9125C137.183 17.823 133.59 16.8788 130.834 16.1549C129.121 15.7047 127.732 15.3397 127.732 14.3566C127.732 13.6046 128.316 13.1603 129.484 13.1603C130.687 13.1603 131.547 13.7412 131.959 14.8697L136.705 13.0231C135.983 10.4945 133.302 9.02437 129.59 9.02437C125.019 9.02437 122.132 11.1465 122.132 14.6337C122.132 18.3232 125.492 19.3268 128.205 20.1373C130.043 20.6862 131.584 21.1465 131.584 22.2924C131.584 23.1127 130.896 23.6253 129.59 23.6253C127.734 23.6253 126.531 22.7711 126.05 21.2666ZM157.6 18.0871C157.6 13.644 154.094 8.99216 148.183 8.99216C142.959 8.99216 138.766 13.2686 138.766 18.463C138.766 23.8308 142.546 27.8995 148.527 27.8995C152.473 27.8995 154.804 26.3867 156.201 24.6616L152.901 21.3716C151.87 22.6401 150.726 23.2493 148.698 23.2493C146.533 23.2493 144.918 22.1552 144.334 20.1392H157.462C157.557 19.4593 157.603 18.7735 157.6 18.0871ZM144.264 16.5825C144.746 14.3943 146.223 13.2658 148.32 13.2658C150.416 13.2658 151.791 14.531 152.272 16.5825H144.264ZM16.7228 1.02356L31.1352 15.3613C31.2611 15.4866 31.3609 15.6354 31.4289 15.7991C31.497 15.9628 31.5319 16.1383 31.5318 16.3155C31.5316 16.4926 31.4964 16.668 31.428 16.8316C31.3597 16.9953 31.2596 17.1439 31.1335 17.269L27.2256 21.1566L15.7648 9.75525L9.17152 16.3143L15.7648 22.8733L19.8525 18.8063L24.7206 23.6486L16.7256 31.605C16.5997 31.7302 16.4503 31.8296 16.2859 31.8973C16.1215 31.9651 15.9453 32 15.7673 32C15.5893 32 15.4131 31.9651 15.2486 31.8973C15.0842 31.8296 14.9348 31.7302 14.809 31.605L0.396538 17.2673C0.142626 17.0145 0 16.6717 0 16.3143C0 15.9569 0.142626 15.6141 0.396538 15.3613L14.8062 1.02356C14.932 0.898338 15.0814 0.799001 15.2458 0.731227C15.4103 0.663454 15.5865 0.628572 15.7645 0.628572C15.9425 0.628572 16.1187 0.663454 16.2831 0.731227C16.4475 0.799001 16.5969 0.898338 16.7228 1.02356Z"
            fill="#000D6E"
          />
        </svg>
      )
    }

    const SmallLogo: FunctionalComponent = () => {
      return (
        <svg
          focusable="false"
          aria-hidden="true"
          width="100"
          height="22"
          viewBox="0 0 100 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M71.2886 3.08227C71.2886 1.78086 72.3924 0.84771 73.679 0.84771C74.9656 0.84771 75.9688 1.78086 75.9688 3.08227C75.9688 4.38368 74.9656 5.29533 73.679 5.29533C72.3924 5.29533 71.2886 4.38403 71.2886 3.08227ZM71.8472 6.83532H75.4888V18.2682H71.8472V6.83532ZM52.405 2.40989H56.0469V18.2678H52.405V2.40989ZM30.6826 18.5505C34.0192 18.5505 36.3961 15.9903 36.3961 12.5629C36.3961 9.13507 34.0847 6.57525 30.7687 6.5756C29.5268 6.5756 28.48 6.94421 27.6514 7.63843V2.41025H24.0095V18.2682H27.368V17.292C28.1966 18.0948 29.3089 18.5505 30.6826 18.5505ZM30.1594 9.74366C31.6858 9.74366 32.7978 10.9358 32.7978 12.5629C32.7978 14.1899 31.6858 15.3613 30.1594 15.3613C28.5675 15.3613 27.4768 14.2114 27.4768 12.5629C27.4768 10.8932 28.5455 9.74366 30.1594 9.74366ZM50.0036 18.2682V6.83532H46.6451V8.02854C45.8382 7.22613 44.7475 6.79197 43.3305 6.79197C39.994 6.79197 37.5951 9.13543 37.5951 12.5629C37.5951 15.9903 39.994 18.5505 43.3305 18.5505C44.7478 18.5505 45.8382 18.0726 46.6451 17.2269V18.2682H50.0036ZM43.8541 9.74367C45.446 9.74367 46.5147 10.8921 46.5147 12.5629C46.5147 14.2117 45.4457 15.3613 43.8541 15.3613C42.3061 15.3613 41.2154 14.1888 41.2154 12.5629C41.2154 10.9369 42.3277 9.74367 43.8541 9.74367ZM63.9216 6.57524C60.2581 6.57524 57.641 9.13507 57.641 12.5628C57.641 15.9688 60.2591 18.5505 63.9216 18.5505C67.6071 18.5505 70.2238 15.9688 70.2238 12.5628C70.2238 9.13507 67.6057 6.57524 63.9216 6.57524ZM63.9432 9.78595C65.5351 9.78595 66.5603 10.914 66.5603 12.541C66.5603 14.1899 65.5135 15.3394 63.9432 15.3398C62.3513 15.3398 61.3045 14.168 61.3045 12.5628C61.3045 10.9136 62.3513 9.78595 63.9432 9.78595ZM79.9809 14.3418L76.9717 15.4916C77.6475 17.489 79.5013 18.5505 82.095 18.5484C85.1262 18.5484 87.045 17.1166 87.045 14.7516C87.045 12.1567 84.765 11.5576 83.0168 11.0983C81.9297 10.8126 81.0482 10.581 81.0482 9.95722C81.0482 9.48007 81.4187 9.19815 82.1601 9.19815C82.9235 9.19815 83.4687 9.56676 83.7305 10.2828L86.7415 9.11111C86.2834 7.50664 84.5824 6.57384 82.2271 6.57384C79.327 6.57384 77.4949 7.92035 77.4949 10.1331C77.4949 12.4741 79.6268 13.1109 81.3484 13.6252C82.5143 13.9735 83.4921 14.2655 83.4921 14.9926C83.4921 15.5131 83.056 15.8384 82.2271 15.8384C81.0496 15.8384 80.2862 15.2964 79.9809 14.3418ZM99.9999 12.3243C99.9999 9.50508 97.7756 6.5534 94.0246 6.5534C90.7101 6.5534 88.0494 9.26686 88.0494 12.5628C88.0494 15.9688 90.4483 18.5505 94.2429 18.5505C96.7469 18.5505 98.2259 17.5905 99.1125 16.496L97.0183 14.4084C96.3644 15.2132 95.6385 15.5998 94.3516 15.5998C92.9779 15.5998 91.9531 14.9056 91.5822 13.6264H99.9128C99.9728 13.195 100.002 12.7598 99.9999 12.3243ZM91.5383 11.3696C91.8436 9.98118 92.7813 9.2651 94.1114 9.2651C95.4416 9.2651 96.3141 10.0679 96.6194 11.3696H91.5383ZM10.6109 1.49718L19.7559 10.5947C19.8357 10.6742 19.899 10.7686 19.9422 10.8725C19.9854 10.9764 20.0076 11.0878 20.0075 11.2002C20.0074 11.3126 19.985 11.4239 19.9416 11.5277C19.8983 11.6315 19.8348 11.7258 19.7548 11.8052L17.2751 14.272L10.003 7.03759L5.81949 11.1994L10.003 15.3613L12.5967 12.7806L15.6857 15.8532L10.6127 20.9017C10.5328 20.9811 10.438 21.0442 10.3337 21.0872C10.2294 21.1302 10.1175 21.1523 10.0046 21.1523C9.89169 21.1523 9.77986 21.1302 9.67553 21.0872C9.5712 21.0442 9.47641 20.9811 9.39657 20.9017L0.251611 11.8041C0.0904986 11.6437 0 11.4262 0 11.1994C0 10.9726 0.0904986 10.7551 0.251611 10.5947L9.3948 1.49718C9.47464 1.41772 9.56943 1.35469 9.67376 1.31169C9.77809 1.26868 9.88992 1.24655 10.0028 1.24655C10.1158 1.24655 10.2276 1.26868 10.3319 1.31169C10.4363 1.35469 10.5311 1.41772 10.6109 1.49718Z"
            fill="#000D6E"
          />
        </svg>
      )
    }

    const LogoElement = this.isAnimated
      ? AnimatedLogo
      : (this.isTouch && this.size === '') || this.size === 'small'
        ? SmallLogo
        : LargeLogo

    return (
      <Host
        class={{
          ...logoBlock.class(),
          ...logoBlock.modifier(this.color).class(),
          ...logoBlock.modifier(`size-${this.size}`).class(this.size !== ''),
          ...logoBlock.modifier('animated').class(this.animated),
        }}
      >
        <LogoElement></LogoElement>
      </Host>
    )
  }
}
