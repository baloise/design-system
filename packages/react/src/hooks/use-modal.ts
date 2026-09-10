import { dsModalController, type ModalOptions } from '@baloise/ds-core'
import { useCallback, useRef, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'

/**
 * Imperative modal hook. `present()` injects React content via `ModalOptions.component`,
 * which lands with #2120 — until then this is a scaffold and will not mount content
 * inside the overlay.
 */
export function useModal() {
  const modalRef = useRef<HTMLDsModalElement | null>(null)
  const rootRef = useRef<Root | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const cleanup = useCallback(() => {
    rootRef.current?.unmount()
    containerRef.current?.remove()
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
      root.render(content)

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
