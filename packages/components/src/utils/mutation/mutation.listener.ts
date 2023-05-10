import { ListenerAbstract } from '../types/listener'
import { MutationObserverOptions } from './mutation.interfaces'

export class BalMutationListener extends ListenerAbstract {
  private tags: string[] = []
  private mutationObserver: MutationObserver | undefined = undefined
  private mutationObserverInit: MutationObserverInit = {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  }

  constructor(options: Partial<MutationObserverOptions>) {
    super()
    this.tags = (options.tags || []).map(t => t.toUpperCase())
    this.mutationObserverInit = {
      childList: options.childList || true,
      subtree: options.subtree || true,
      attributes: options.attributes || true,
      characterData: options.characterData || true,
    }
  }

  connect(el: HTMLElement): void {
    super.connect(el)
    if (typeof MutationObserver === 'undefined') {
      return
    }
    this.destroyMutationObserver()
    this.mutationObserver = new MutationObserver(this.mutationCallback)
    this.mutationObserver.observe(el, this.mutationObserverInit)
  }

  disconnect(): void {
    super.disconnect()
    this.destroyMutationObserver()
  }

  private mutationCallback = (mutationRecord: MutationRecord[]) => {
    const hasChanges = mutationRecord.some(record => this.tags.includes(record.target.nodeName))
    if (hasChanges) {
      return this.notify(undefined)
    }

    const hasRemovedNodeChanges = mutationRecord.some(record =>
      Array.from(record.removedNodes).some((node: any) => this.tags.includes(node.nodeName)),
    )
    if (hasRemovedNodeChanges) {
      return this.notify(undefined)
    }

    const hasCharacterDataChanges = mutationRecord.some(record => record.type === 'characterData')
    if (hasCharacterDataChanges) {
      return this.notify(undefined)
    }
  }

  private destroyMutationObserver() {
    if (this.mutationObserver !== undefined) {
      this.mutationObserver.disconnect()
      this.mutationObserver = undefined
    }
  }
}
