import { HTMLStencilElement } from '@stencil/core/internal'
import { OverlayInterface } from '../components/bal-modal/bal-modal.type'
import { addEventListener, removeEventListener } from './helpers'

let lastId = 0

export const OVERLAY_BACK_BUTTON_PRIORITY = 100
export const MENU_BACK_BUTTON_PRIORITY = 99
export const BACKDROP = 'backdrop'

export interface BackButtonEventDetail {
  register(priority: number, handler: (processNextHandler: () => void) => Promise<any> | void): void
}

export type BackButtonEvent = CustomEvent<BackButtonEventDetail>

export interface HTMLBalOverlayElement extends HTMLStencilElement {
  overlayIndex: number
  // backdropDismiss?: boolean;
  // lastFocus?: HTMLElement;

  dismiss(data?: any, role?: string): Promise<boolean>
}

export const prepareOverlay = (overlay: OverlayInterface) => {
  /* tslint:disable-next-line */
  if (typeof document !== 'undefined') {
    connectListeners(document)
  }
  const overlayIndex = lastId++
  overlay.overlayIndex = overlayIndex
  if (!overlay.el.hasAttribute('id')) {
    overlay.el.id = `bal-overlay-${overlayIndex}`
  }
}

export const getOverlays = (doc: Document, selector?: string): HTMLBalOverlayElement[] => {
  if (selector === undefined) {
    selector = 'bal-modal,bal-snackbar,bal-toast'
  }
  return (Array.from(doc.querySelectorAll(selector)) as HTMLBalOverlayElement[]).filter(c => c.overlayIndex > 0)
}

export const getOverlay = (doc: Document, overlayTag?: string, id?: string): HTMLBalOverlayElement | undefined => {
  const overlays = getOverlays(doc, overlayTag)
  return id === undefined ? overlays[overlays.length - 1] : overlays.find(o => o.id === id)
}

export const connectListeners = (doc: Document) => {
  if (lastId === 0) {
    lastId = 1

    // handle ESC to close overlay
    doc.addEventListener('keyup', ev => {
      if (ev.key === 'Escape') {
        const lastOverlay = getOverlay(doc)
        if (lastOverlay) {
          lastOverlay.dismiss(undefined, BACKDROP)
        }
      }
    })
  }
}

export const dismiss = async (overlay: OverlayInterface, data: any | undefined, role: string | undefined, animation: () => Promise<void>): Promise<boolean> => {
  if (!overlay.presented) {
    return false
  }

  try {
    // Overlay contents should not be clickable during dismiss
    overlay.el.style.setProperty('pointer-events', 'none')
    overlay.willDismiss.emit({ data, role })
    await animation()
    overlay.presented = false
    overlay.didDismiss.emit({ data, role })
  } catch (err) {
    overlay.presented = false
    console.error(err)
  }

  overlay.el.remove()
  return true
}

export const eventMethod = <T>(element: HTMLElement, eventName: string): Promise<T> => {
  let resolve: (detail: T) => void
  const promise = new Promise<T>(r => (resolve = r))
  onceEvent(element, eventName, (event: any) => {
    resolve(event.detail)
  })
  return promise
}

export const onceEvent = (element: HTMLElement, eventName: string, callback: (ev: Event) => void) => {
  const handler = (ev: Event) => {
    removeEventListener(element, eventName, handler)
    callback(ev)
  }
  addEventListener(element, eventName, handler)
}
