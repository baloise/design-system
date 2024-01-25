import { deepReady, waitAfterFramePaint } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { MutationObserverOptions } from './mutation.interfaces'

export class BalMutationListener extends ListenerAbstract {
  private tags: string[] = []
  private waitAfterFramePrint = false
  private mutationObserver: MutationObserver | undefined = undefined
  private mutationObserverInit: MutationObserverInit = {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  }

  constructor(options: Partial<MutationObserverOptions>) {
    super()
    this.waitAfterFramePrint = options.waitAfterFramePrint || this.waitAfterFramePrint
    this.tags = (options.tags || []).map(t => t.toUpperCase())
    this.mutationObserverInit = {
      childList: options.childList === false ? false : true,
      subtree: options.subtree === false ? false : true,
      attributes: options.attributes === false ? false : true,
      characterData: options.characterData === false ? false : true,
    }
  }

  async connect(el: HTMLElement) {
    super.connect(el)
    if (typeof MutationObserver === 'undefined') {
      return
    }
    if (this.waitAfterFramePrint) {
      await deepReady(el)
      await waitAfterFramePaint()
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

    if (this.tags.length === 0 && mutationRecord.length > 0) {
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
