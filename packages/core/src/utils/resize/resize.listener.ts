import { balBrowser } from '../browser'
import { debounce } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { BalResizeInfo } from './resize.interfaces'

export class BalResizeListener<TObserver> extends ListenerAbstract<TObserver, BalResizeInfo> {
  private resizeObserver: ResizeObserver | undefined
  private debouncedNotify = debounce((info: BalResizeInfo) => this.notify(info), 42)
  private lastWidth: number | undefined
  private lastHeight: number | undefined

  connect(el: HTMLElement): void {
    super.connect(el)
    if (typeof ResizeObserver === 'undefined') {
      return
    }

    if (this.resizeObserver !== undefined) {
      this.resizeObserver?.disconnect()
      this.resizeObserver = undefined
    }

    this.resizeObserver = new ResizeObserver(entries => {
      if (balBrowser.hasWindow) {
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return
          }
          const entry = entries[0]

          if (this.lastWidth === undefined && this.lastHeight === undefined) {
            this.lastWidth = entry.contentRect.width
            this.lastHeight = entry.contentRect.height
          } else {
            const widthChanged = this.lastWidth !== entry.contentRect.width
            const heightChanged = this.lastHeight !== entry.contentRect.height

            if (widthChanged || heightChanged) {
              this.debouncedNotify({
                width: widthChanged,
                height: heightChanged,
              })
              this.lastWidth = entry.contentRect.width
              this.lastHeight = entry.contentRect.height
            }
          }
        })
      }
    })

    this.resizeObserver.observe(el)
  }

  disconnect(): void {
    super.disconnect()
    this.resizeObserver?.disconnect()
    this.resizeObserver = undefined
  }
}
