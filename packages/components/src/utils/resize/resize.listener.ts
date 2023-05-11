import { debounce } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { BalResizeInfo } from './resize.interfaces'

export class BalResizeListener<TObserver> extends ListenerAbstract<TObserver, BalResizeInfo> {
  private resizeObserver: ResizeObserver | undefined
  private debouncedNotify = debounce(() => this.notify(), 50)

  connect(el: HTMLElement): void {
    super.connect(el)
    if (typeof ResizeObserver === 'undefined') {
      return
    }
    if (this.resizeObserver !== undefined) {
      this.resizeObserver?.disconnect()
      this.resizeObserver = undefined
    }

    this.resizeObserver = new ResizeObserver(() => this.debouncedNotify())
    this.resizeObserver.observe(el)
  }

  disconnect(): void {
    super.disconnect()
    this.resizeObserver?.disconnect()
    this.resizeObserver = undefined
  }
}
