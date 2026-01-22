import type { HostElement } from '@stencil/core/internal'
import type { BalPage } from '../../types'

export const waitForChanges = async (page: BalPage, timeoutMs = 300) => {
  try {
    if (page.isClosed()) {
      /**
       * If the page is already closed, we can skip the long execution of this method
       * and return early.
       */
      return
    }
    await page.evaluate(() => {
      // BROWSER CONTEXT
      return new Promise<void>(resolve => {
        // Wait for the next repaint to happen
        requestAnimationFrame(() => {
          const promiseChain: Promise<any>[] = []

          const waitComponentOnReady = (elm: Element | ShadowRoot, promises: Promise<any>[]) => {
            if ('shadowRoot' in elm && elm.shadowRoot instanceof ShadowRoot) {
              waitComponentOnReady(elm.shadowRoot, promises)
            }
            const children = elm.children
            const len = children.length
            for (let i = 0; i < len; i++) {
              const childElm = children[i]
              const childStencilElm = childElm as HostElement
              if (childElm.tagName.includes('-') && typeof childStencilElm.componentOnReady === 'function') {
                /**
                 * We are only using the lazy loaded bundle
                 * here so we can safely use the
                 * componentOnReady method.
                 */
                promises.push(childStencilElm.componentOnReady())
              }
              waitComponentOnReady(childElm, promises)
            }
          }

          waitComponentOnReady(document.documentElement, promiseChain)

          Promise.all(promiseChain)
            .then(() => resolve())
            .catch(() => resolve())
        })
      })
    })
    if (page.isClosed()) {
      return
    }
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(timeoutMs)
  } catch (e) {
    console.error(e)
  }
}
