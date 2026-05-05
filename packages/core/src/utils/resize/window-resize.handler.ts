import { dsBrowser } from '../browser'
import { dsDevice } from '../device'

export type WindowResizeHandlerObserver = () => void

export type WindowResizeHandlerOptions = {
  onlyListenToWidthChanges: boolean
}

export class WindowResizeHandler {
  private previousWidth = dsBrowser.window.width
  private previousHeight = dsBrowser.window.height
  private previousIsLandscape = this.isLandscape
  private options: WindowResizeHandlerOptions = {
    onlyListenToWidthChanges: false,
  }

  constructor(options: Partial<WindowResizeHandlerOptions> = {}) {
    this.options = { ...this.options, ...options }
  }

  public async hasResized(): Promise<boolean> {
    if (dsDevice.hasTouchScreen) {
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
    return dsBrowser.window.width > dsBrowser.window.height
  }

  private get sameWidth() {
    return this.previousWidth === dsBrowser.window.width
  }

  private get sameHeight() {
    return this.previousHeight === dsBrowser.window.height
  }

  private resetPreviousValues() {
    this.previousWidth = dsBrowser.window.width
    this.previousHeight = dsBrowser.window.height
    this.previousIsLandscape = this.isLandscape
  }
}
