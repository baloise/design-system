export interface MutationObserverOptions extends MutationObserverInit {
  tags: string[]
}

export type MutationHandlerObserver = () => void

export const MutationHandler = (options: MutationObserverOptions) => {
  let mutationObserver: MutationObserver | undefined = undefined
  let mutationHandlerObservers: MutationHandlerObserver[] = []
  let targetNode: HTMLElement | null = null
  let isObserving = false
  const tags = options.tags.map(t => t.toUpperCase())

  const config: MutationObserverInit = {
    childList: options.childList || true,
    subtree: options.subtree || true,
    attributes: options.attributes || true,
    characterData: options.characterData || true,
  }

  const callback = (mutationRecord: MutationRecord[]) => {
    mutationRecord = mutationRecord.filter(record => tags.includes(record.target.nodeName))
    if (mutationRecord.length > 0) {
      mutationHandlerObservers.forEach(observer => observer())
    }
  }

  return {
    connect: (el: HTMLElement | null) => {
      if (typeof MutationObserver === 'undefined') {
        return
      }

      if (mutationObserver !== undefined) {
        mutationObserver.disconnect()
        mutationObserver = undefined
      }

      targetNode = el
      mutationObserver = new MutationObserver(callback)
    },
    onChange: (callback: MutationHandlerObserver) => {
      mutationHandlerObservers.push(callback)
    },
    observe: () => {
      if (!isObserving && targetNode && mutationObserver) {
        mutationObserver.observe(targetNode, config)
        isObserving = true
      }
    },
    stopObserve: () => {
      mutationObserver?.disconnect()
      isObserving = false
    },
    disconnect: () => {
      mutationObserver?.disconnect()
      mutationObserver = undefined
      mutationHandlerObservers = []
      isObserving = false
    },
  }
}
