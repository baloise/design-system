import { HTMLStencilElement } from '@stencil/core/internal'
import { balBrowser } from '../browser'
import { addEventListener, removeEventListener } from '../helpers'
import { focusableQueryString, focusFirstDescendant, focusLastDescendant, focusVisibleElement } from './focus-trap'

type OverlayInterface = any

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
  lastFocus: HTMLElement
  el: HTMLBalOverlayElement
  dismiss(data?: any, role?: string): Promise<boolean>
}

export const prepareOverlay = (overlay: OverlayInterface) => {
  /* tslint:disable-next-line */
  if (balBrowser.hasDocument) {
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
    doc.addEventListener(
      'focus',
      (ev: FocusEvent) => {
        trapKeyboardFocus(ev, doc)
      },
      true,
    )

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

export const getPresentedOverlay = (
  doc: Document,
  overlayTag?: string,
  id?: string,
): HTMLBalOverlayElement | undefined => {
  const overlays = getPresentedOverlays(doc, overlayTag)
  return id === undefined ? overlays[overlays.length - 1] : overlays.find(o => o.id === id)
}

const getPresentedOverlays = (doc: Document, overlayTag?: string): HTMLBalOverlayElement[] => {
  return getOverlays(doc, overlayTag).filter(o => !isOverlayHidden(o))
}

const isOverlayHidden = (overlay: Element) => overlay.classList.contains('is-hidden')

const trapKeyboardFocus = (ev: Event, doc: Document) => {
  const lastOverlay = getPresentedOverlay(doc, 'bal-modal')
  const target = ev.target as HTMLElement | null

  /**
   * If no active overlay, ignore this event.
   *
   * If this component uses the shadow dom,
   * this global listener is pointless
   * since it will not catch the focus
   * traps as they are inside the shadow root.
   * We need to add a listener to the shadow root
   * itself to ensure the focus trap works.
   */
  if (!lastOverlay || !target) {
    return
  }

  const trapScopedFocus = () => {
    /**
     * If we are focusing the overlay, clear
     * the last focused element so that hitting
     * tab activates the first focusable element
     * in the overlay wrapper.
     */
    if (lastOverlay === target) {
      lastOverlay.lastFocus = undefined
      /**
       * Toasts can be presented from an overlay.
       * However, focus should still be returned to
       * the overlay when clicking a toast. Normally,
       * focus would be returned to the last focusable
       * descendant in the overlay which may not always be
       * the button that the toast was presented from. In this case,
       * the focus may be returned to an unexpected element.
       * To account for this, we make sure to return focus to the
       * last focused element in the overlay if focus is
       * moved to the toast.
       */
    } else {
      /**
       * We do not want to focus the traps, so get the overlay
       * wrapper element as the traps live outside of the wrapper.
       */
      const overlayRoot = lastOverlay

      const overlayWrapper = overlayRoot.querySelector<HTMLElement>('.bal-modal__container')
      if (!overlayWrapper) {
        return
      }

      /**
       * If the target is inside the wrapper, let the browser
       * focus as normal and keep a log of the last focused element.
       * Additionally, if the backdrop was tapped we should not
       * move focus back inside the wrapper as that could cause
       * an interactive elements focus state to activate.
       */
      if (overlayWrapper.contains(target) || target === overlayRoot.querySelector('bal-modal__background')) {
        lastOverlay.lastFocus = target
      } else {
        /**
         * Otherwise, we must have focused one of the focus traps.
         * We need to wrap the focus to either the first element
         * or the last element.
         */

        /**
         * Once we call `focusFirstDescendant` and focus the first
         * descendant, another focus event will fire which will
         * cause `lastOverlay.lastFocus` to be updated before
         * we can run the code after that. We will cache the value
         * here to avoid that.
         */
        const lastFocus = lastOverlay.lastFocus

        // Focus the first element in the overlay wrapper
        focusFirstDescendant(overlayWrapper, lastOverlay)

        /**
         * If the cached last focused element is the
         * same as the active element, then we need
         * to wrap focus to the last descendant. This happens
         * when the first descendant is focused, and the user
         * presses Shift + Tab. The previous line will focus
         * the same descendant again (the first one), causing
         * last focus to equal the active element.
         */
        if (lastFocus === doc.activeElement) {
          focusLastDescendant(overlayWrapper, lastOverlay)
        }
        lastOverlay.lastFocus = doc.activeElement as HTMLElement
      }
    }
  }
  const trapShadowFocus = () => {
    /**
     * If the target is inside the wrapper, let the browser
     * focus as normal and keep a log of the last focused element.
     */
    if (lastOverlay.contains(target)) {
      lastOverlay.lastFocus = target
      /**
       * Toasts can be presented from an overlay.
       * However, focus should still be returned to
       * the overlay when clicking a toast. Normally,
       * focus would be returned to the last focusable
       * descendant in the overlay which may not always be
       * the button that the toast was presented from. In this case,
       * the focus may be returned to an unexpected element.
       * To account for this, we make sure to return focus to the
       * last focused element in the overlay if focus is
       * moved to the toast.
       */
    } else if (target.tagName === 'BAL-TOAST') {
      focusElementInOverlay(lastOverlay.lastFocus, lastOverlay)
    } else {
      /**
       * Otherwise, we are about to have focus
       * go out of the overlay. We need to wrap
       * the focus to either the first element
       * or the last element.
       */

      /**
       * Once we call `focusFirstDescendant` and focus the first
       * descendant, another focus event will fire which will
       * cause `lastOverlay.lastFocus` to be updated before
       * we can run the code after that. We will cache the value
       * here to avoid that.
       */
      const lastFocus = lastOverlay.lastFocus

      // Focus the first element in the overlay wrapper
      focusFirstDescendant(lastOverlay)

      /**
       * If the cached last focused element is the
       * same as the active element, then we need
       * to wrap focus to the last descendant. This happens
       * when the first descendant is focused, and the user
       * presses Shift + Tab. The previous line will focus
       * the same descendant again (the first one), causing
       * last focus to equal the active element.
       */
      if (lastFocus === doc.activeElement) {
        focusLastDescendant(lastOverlay)
      }
      lastOverlay.lastFocus = doc.activeElement as HTMLElement
    }
  }

  if (lastOverlay.shadowRoot) {
    trapShadowFocus()
  } else {
    trapScopedFocus()
  }
}

export const dismiss = async (
  overlay: OverlayInterface,
  data: any | undefined,
  role: string | undefined,
  animation: () => Promise<void>,
): Promise<boolean> => {
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
  onceEvent(element, eventName, (ev: any) => {
    resolve(ev.detail)
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

/**
 * Focuses a particular element in an overlay. If the element
 * doesn't have anything focusable associated with it then
 * the overlay itself will be focused.
 * This should be used instead of the focus() method
 * on most elements because the focusable element
 * may not be the host element.
 *
 * For example, if an bal-button should be focused
 * then we should actually focus the native <button>
 * element inside of bal-button's shadow root, not
 * the host element itself.
 */
const focusElementInOverlay = (hostToFocus: HTMLElement | null | undefined, overlay: HTMLBalOverlayElement) => {
  let elementToFocus = hostToFocus

  const shadowRoot = hostToFocus?.shadowRoot
  if (shadowRoot) {
    // If there are no inner focusable elements, just focus the host element.
    elementToFocus = shadowRoot.querySelector<HTMLElement>(focusableQueryString) || hostToFocus
  }

  if (elementToFocus) {
    focusVisibleElement(elementToFocus)
  } else {
    // Focus overlay instead of letting focus escape
    overlay.focus()
  }
}

export const FOCUS_TRAP_DISABLE_CLASS = 'bal-disable-focus-trap'
