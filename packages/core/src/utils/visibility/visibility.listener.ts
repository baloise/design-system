import { deepReady, waitAfterFramePaint } from '../helpers'
import { ListenerAbstract } from '../types/listener'

export class BalVisibilityListener extends ListenerAbstract {
  private waitAfterFramePrint = false
  private intersectionObserver: IntersectionObserver | undefined = undefined

  async connect(el: HTMLElement) {
    super.connect(el)
    if (typeof IntersectionObserver === 'undefined') {
      return
    }
    if (this.waitAfterFramePrint) {
      await deepReady(el)
      await waitAfterFramePaint()
    }
    this.destroyMutationObserver()
    this.intersectionObserver = new IntersectionObserver(this.intersectionCallback, {
      root: null, // Use the viewport as the container
      threshold: 0.5, // Trigger when 50% of the element is visible
    })
    this.intersectionObserver.observe(el)
  }

  disconnect(): void {
    super.disconnect()
    this.destroyMutationObserver()
  }

  private intersectionCallback = (records: IntersectionObserverEntry[]) => {
    const isIntersecting = records.some(record => record.isIntersecting)
    if (isIntersecting) {
      this.notify()
    }
  }

  private destroyMutationObserver() {
    if (this.intersectionObserver !== undefined) {
      this.intersectionObserver.disconnect()
      this.intersectionObserver = undefined
    }
  }
}
