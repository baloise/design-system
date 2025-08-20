import { balBrowser } from './browser'

export class BalScrollHandler {
  static disableSmoothScrolling() {
    this.setScrollBehavior('auto')
  }

  static enableSmoothScrolling() {
    this.setScrollBehavior('smooth')
  }

  private static setScrollBehavior(behavior: 'auto' | 'smooth') {
    if (balBrowser.hasDocument) {
      const doc = document
      const body = document.body

      body.style.scrollBehavior = behavior

      const html = doc.firstChild?.nextSibling as HTMLElement
      const styles = getComputedStyle(html)

      if (styles.scrollBehavior === 'smooth') {
        html.style.scrollBehavior = behavior
      }
    }
  }

  private target: HTMLElement | Document | undefined
  private x: number | undefined = undefined
  private y: number | undefined = undefined
  private disabled = false

  connect(el?: HTMLElement) {
    if (el) {
      this.target = el
    } else {
      if (balBrowser.hasDocument) {
        this.target = document
      }
    }
    onscroll = null
    onkeydown = null
  }

  disconnect() {
    if (this.disabled) {
      this.enable()
    }
    this.target = undefined
    onscroll = null
    onkeydown = null
  }

  isDisabled() {
    return this.disabled
  }

  enable() {
    if (this.target) {
      if (balBrowser.hasWindow && balBrowser.hasDocument) {
        document.documentElement.style.overflow = ''
        document.body.classList.remove('noscroll')
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        if (this.x !== undefined && this.y !== undefined) {
          window.scrollTo(this.x, this.y)
          this.x = undefined
          this.y = undefined
        }
        this.disabled = false
      }
    }
  }

  disable() {
    if (!this.disabled && this.target) {
      if (balBrowser.hasWindow && balBrowser.hasDocument) {
        this.x = window.pageXOffset || document.documentElement.scrollLeft
        this.y = window.pageYOffset || document.documentElement.scrollTop

        document.documentElement.style.overflow = 'hidden'
        document.body.classList.add('noscroll')
        document.body.style.position = 'fixed'
        document.body.style.top = `-${this.y}px`
        document.body.style.width = `100%`

        this.disabled = true
      }
    }
  }
}
