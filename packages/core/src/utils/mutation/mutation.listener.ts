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
    // default when no tag is provided
    if (this.tags.length === 0 && mutationRecord.length > 0) {
      return this.notify(undefined)
    }

    const tagRecords = mutationRecord.filter(record => this.tags.includes(record.target.nodeName.toLowerCase()))

    // check for added nodes
    const hasAddedNodeChanges = tagRecords.some(record =>
      Array.from(record.addedNodes).some((node: any) => this.tags.includes(node.nodeName)),
    )

    // check for removed nodes
    const hasRemovedNodeChanges = tagRecords.some(record =>
      Array.from(record.removedNodes).some((node: any) => this.tags.includes(node.nodeName)),
    )

    // check for attribute changes
    const attributeNameCheck = (attributeName: string): boolean => {
      return (
        attributeName !== 'styles' &&
        attributeName !== 'class' &&
        !attributeName.startsWith('data-') &&
        !attributeName.startsWith('aria-')
      )
    }
    const hasAttributeChanges = tagRecords.some(
      record => record.type === 'attributes' && attributeNameCheck(record.attributeName),
    )

    if (hasAddedNodeChanges || hasAttributeChanges || hasRemovedNodeChanges) {
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
