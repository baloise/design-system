import { balBrowser } from '../browser'
import { balDevice } from '../device'

export type BalWindowResizeHandlerObserver = () => void

export type BalWindowResizeHandlerOptions = {
  onlyListenToWidthChanges: boolean
}

export class BalWindowResizeHandler {
  private previousWidth = balBrowser.window.width
  private previousHeight = balBrowser.window.height
  private previousIsLandscape = this.isLandscape
  private options: BalWindowResizeHandlerOptions = {
    onlyListenToWidthChanges: false,
  }

  constructor(options: Partial<BalWindowResizeHandlerOptions> = {}) {
    this.options = { ...this.options, ...options }
  }

  public async hasResized(): Promise<boolean> {
    if (balDevice.hasTouchScreen) {
      if (!this.sameWidth || this.previousIsLandscape !== this.isLandscape) {
        this.resetPreviousValues()
        return true
      }
    } else {
      if (this.options.onlyListenToWidthChanges) {
        if (!this.sameWidth) {
          this.resetPreviousValues()
          return true
        }
      } else {
        if (!this.sameWidth || !this.sameHeight) {
          this.resetPreviousValues()
          return true
        }
      }
    }

    return false
  }

  private get isLandscape() {
    return balBrowser.window.width > balBrowser.window.height
  }

  private get sameWidth() {
    return this.previousWidth === balBrowser.window.width
  }

  private get sameHeight() {
    return this.previousHeight === balBrowser.window.height
  }

  private resetPreviousValues() {
    this.previousWidth = balBrowser.window.width
    this.previousHeight = balBrowser.window.height
    this.previousIsLandscape = this.isLandscape
  }
}
