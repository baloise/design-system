'use client'

import { dsModalController, type ModalOptions } from '@helvetia-design/core'
import { useCallback, useRef, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { createRoot, type Root } from 'react-dom/client'

/**
 * Imperative modal hook. `present()` mounts React content into a detached container
 * and hands it to the modal controller via `ModalOptions.component`.
 */
export function useModal() {
  const modalRef = useRef<HTMLDsModalElement | null>(null)
  const rootRef = useRef<Root | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const projectedNodesRef = useRef<ChildNode[]>([])

  const cleanup = useCallback(() => {
    // The controller moves the container's children into ds-modal's light DOM so the
    // browser can slot them; React still thinks they live in the container, so move
    // them back before unmounting or React's reconciler fails to remove them.
    const container = containerRef.current
    if (container) {
      projectedNodesRef.current.forEach(node => container.appendChild(node))
    }
    rootRef.current?.unmount()
    containerRef.current?.remove()
    modalRef.current?.remove?.()
    projectedNodesRef.current = []
    modalRef.current = null
    rootRef.current = null
    containerRef.current = null
  }, [])

  const dismiss = useCallback(async (data?: unknown, role?: string) => {
    const modal = modalRef.current
    if (!modal) return
    // dismiss gains a data/role payload in #2120
    await (modal.dismiss as (data?: unknown, role?: string) => Promise<void>)(data, role)
  }, [])

  const present = useCallback(
    async (content: ReactNode, options?: Omit<ModalOptions, 'component' | 'componentProps'>) => {
      cleanup()

      const container = document.createElement('div')
      const root = createRoot(container)
      containerRef.current = container
      rootRef.current = root
      // The modal controller reads the container's children synchronously to project
      // them into ds-modal's slots, so the initial render must commit before it runs.
      flushSync(() => root.render(content))
      projectedNodesRef.current = Array.from(container.childNodes)

      const modal = await dsModalController.create({
        ...options,
        component: container,
      } as ModalOptions)

      modalRef.current = modal
      modal.addEventListener('dsDidDismiss', cleanup, { once: true })
    },
    [cleanup],
  )

  return [present, dismiss] as const
}
