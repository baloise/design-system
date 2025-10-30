import { EventEmitter } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { balBrowser } from './browser'
import { BalConfig, useBalConfig } from './config'
import {
  balIconCaretDown,
  balIconCaretLeft,
  balIconCaretRight,
  balIconCaretUp,
  balIconCheck,
  balIconClose,
  balIconDate,
  balIconDocument,
  balIconEdit,
  balIconInfoCircle,
  balIconMenuBars,
  balIconMinus,
  balIconNavGoDown,
  balIconNavGoLeft,
  balIconNavGoRight,
  balIconNavGoUp,
  balIconPlus,
  balIconTrash,
  balIconUpload,
} from './constants/icons.constant'

declare const __zone_symbol__requestAnimationFrame: any
declare const requestAnimationFrame: any

/**
 * Request Largest Contentful Paint (LCP) callback
 */
export const rLCP = (callback: () => void, timeout = 3000) => {
  let isLargestContentPatinDone = false
  if (!balBrowser.isSafari && balBrowser.hasWindow && 'PerformanceObserver' in window) {
    const observer = new PerformanceObserver(entryList => {
      const entries = entryList.getEntries()
      const lcpEntry = entries[entries.length - 1] // Get the last (largest) entry
      if (lcpEntry) {
        // Disconnect the observer as we only need the LCP
        observer.disconnect()

        // Load the script after LCP
        isLargestContentPatinDone = true
        rIC(() => callback())
      }
    })

    // Start observing for Largest Contentful Paint (LCP) entries
    observer.observe({ type: 'largest-contentful-paint', buffered: true })

    setTimeout(() => {
      if (!isLargestContentPatinDone) {
        observer.disconnect()
        callback()
      }
    }, timeout)
  } else {
    return setTimeout(callback, 32)
  }
}

export const rOnLoad = (callback: () => void, timeout = 32) => {
  let called = false

  const callOnce = () => {
    if (!called) {
      called = true
      callback()
    }
  }

  if (balBrowser.hasWindow) {
    const timer = setTimeout(callOnce, timeout)
    window.addEventListener('load', () => {
      clearTimeout(timer)
      callOnce()
    })
  } else {
    setTimeout(callOnce, 32)
  }
}

export const rIC = (callback: () => void, timeout = 5000) => {
  if (balBrowser.hasWindow && 'requestIdleCallback' in window) {
    ;(window as any).requestIdleCallback(callback, { timeout })
  } else {
    setTimeout(callback, 32)
  }
}

export const wait = (ms = 0): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}

export const debounceEvent = (ev: EventEmitter, wait: number): EventEmitter => {
  const original = (ev as any)._original || ev
  return {
    _original: ev,
    emit: debounce(original.emit.bind(original), wait),
  } as EventEmitter
}

export const debounceLCP = (func: (...args: any[]) => void, wait = 0) => {
  let timer: any
  return (...args: any[]): any => {
    clearTimeout(timer)
    timer = setTimeout(func, wait, ...args)
  }
}

export const debounce = (func: (...args: any[]) => void, wait = 0) => {
  let timer: any
  return (...args: any[]): any => {
    clearTimeout(timer)
    timer = setTimeout(func, wait, ...args)
  }
}

export const hasTagName = (element: any, tag: string) => {
  return element && element.tagName && element.tagName === tag.toUpperCase()
}

export const isDescendant = (
  parent: HTMLElement | HTMLStencilElement,
  child: HTMLElement | HTMLStencilElement | EventTarget,
) => {
  let node = (child as any).parentNode
  while (node != null) {
    if (node == parent) {
      return true
    }
    node = node.parentNode
  }
  return false
}

export const hasParent = (parentTag: string, child: HTMLElement | EventTarget) => {
  let node = (child as any).parentNode
  while (node != null) {
    if (node.tagName === parentTag.toUpperCase()) {
      return true
    }
    node = node.parentNode
  }
  return false
}

export const getSibling = (parentTag: HTMLElement | EventTarget, child: string): HTMLElement | null => {
  const node: HTMLElement = (parentTag as any).parentNode
  return node.querySelector(child)
}

export const getAppRoot = (doc: Document) => {
  return doc.querySelector('bal-app') || doc.body
}

/**
 * Waits for a component to be ready for
 * both custom element and non-custom element builds.
 * If non-custom element build, el.componentOnReady
 * will be used.
 * For custom element builds, we wait a frame
 * so that the inner contents of the component
 * have a chance to render.
 *
 * Use this utility rather than calling
 * el.componentOnReady yourself.
 */
export const componentOnReady = (el: any, callback: any) => {
  if (el.componentOnReady !== null && el.componentOnReady !== undefined) {
    el.componentOnReady().then((resolvedEl: any) => callback(resolvedEl))
  } else {
    raf(() => callback(el))
  }
}

/**
 * Patched version of requestAnimationFrame that avoids ngzone
 * Use only when you know ngzone should not run
 */
export const raf = (h: any) => {
  if (typeof __zone_symbol__requestAnimationFrame === 'function') {
    return __zone_symbol__requestAnimationFrame(h)
  }
  if (typeof requestAnimationFrame === 'function') {
    return requestAnimationFrame(h)
  }
  return setTimeout(h)
}

export const transitionEndAsync = (el: HTMLElement | HTMLStencilElement | null, expectedDuration = 0) => {
  return new Promise(resolve => {
    transitionEnd(el, expectedDuration, resolve)
  })
}

/**
 * Allows developer to wait for a transition
 * to finish and fallback to a timer if the
 * transition is cancelled or otherwise
 * never finishes. Also see transitionEndAsync
 * which is an await-able version of this.
 */
const transitionEnd = (
  el: HTMLElement | HTMLStencilElement | null,
  expectedDuration = 0,
  callback: (ev?: TransitionEvent) => void,
) => {
  let unRegTrans: (() => void) | undefined
  let animationTimeout: any
  const opts: any = { passive: true }
  const ANIMATION_FALLBACK_TIMEOUT = 500

  const unregister = () => {
    if (unRegTrans) {
      unRegTrans()
    }
  }

  const onTransitionEnd = (ev?: Event) => {
    if (ev === undefined || el === ev.target) {
      unregister()
      callback(ev as TransitionEvent)
    }
  }

  if (el) {
    el.addEventListener('webkitTransitionEnd', onTransitionEnd, opts)
    el.addEventListener('transitionend', onTransitionEnd, opts)
    animationTimeout = setTimeout(onTransitionEnd, expectedDuration + ANIMATION_FALLBACK_TIMEOUT)

    unRegTrans = () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout)
        animationTimeout = undefined
      }
      el.removeEventListener('webkitTransitionEnd', onTransitionEnd, opts)
      el.removeEventListener('transitionend', onTransitionEnd, opts)
    }
  }

  return unregister
}

export const addEventListener = (el: any, eventName: string, callback: any, opts?: any) => {
  if (balBrowser.hasWindow) {
    const config = useBalConfig()
    if (config) {
      const ael = config._ael
      if (ael) {
        return ael(el, eventName, callback, opts)
      } else if (config._ael) {
        return config._ael(el, eventName, callback, opts)
      }
    }
  }

  return el.addEventListener(eventName, callback, opts)
}

export const removeEventListener = (el: any, eventName: string, callback: any, opts?: any) => {
  if (balBrowser.hasWindow) {
    const config = useBalConfig()
    if (config) {
      const rel = config._rel
      if (rel) {
        return rel(el, eventName, callback, opts)
      } else if (config._rel) {
        return config._rel(el, eventName, callback, opts)
      }
    }
  }

  return el.removeEventListener(eventName, callback, opts)
}

export const shallowReady = (el: any | undefined): Promise<any> => {
  if (el) {
    return new Promise(resolve => componentOnReady(el, resolve))
  }
  return Promise.resolve()
}

export const deepReady = async (el: any | undefined, full = false): Promise<void> => {
  const element = el as any
  if (element) {
    if (element.componentOnReady !== null && element.componentOnReady !== undefined) {
      const stencilEl = await element.componentOnReady()
      if (!full && stencilEl !== null && stencilEl !== undefined) {
        return
      }
    }
    await Promise.all(Array.from(element.children).map(child => deepReady(child, full)))
  }
}

export const waitForComponent = async (el: HTMLElement | HTMLStencilElement | null) => {
  await deepReady(el, true)
  await waitAfterFramePaint()
  await waitAfterIdleCallback()
}

export const isChildOfEventTarget = async (
  ev: any,
  el: HTMLElement | HTMLStencilElement | Window | Document,
  callback: (target: HTMLElement | HTMLStencilElement) => void,
) => {
  if (ev && ev.target && el && el !== ev.target) {
    let target = ev.target as HTMLElement | HTMLStencilElement

    // special case for the navbar case
    const isNavbarBrand = ev.target.nodeName === 'BAL-NAVBAR-BRAND'
    if (isNavbarBrand) {
      target = target.closest('bal-navbar') as HTMLStencilElement
    }

    if (target && isDescendant(target, el)) {
      callback(target)
    }
  }
}

export const waitForDesignSystem = async (el: any | null, _config?: BalConfig): Promise<void> => {
  const config: any = {
    animated: false,
    icons: {
      balIconClose,
      balIconInfoCircle,
      balIconPlus,
      balIconMinus,
      balIconEdit,
      balIconTrash,
      balIconNavGoLeft,
      balIconNavGoRight,
      balIconNavGoDown,
      balIconNavGoUp,
      balIconCaretUp,
      balIconCaretDown,
      balIconCaretLeft,
      balIconCaretRight,
      balIconCheck,
      balIconDate,
      balIconDocument,
      balIconUpload,
      balIconMenuBars,
    },
    ..._config,
  }
  const element = el as any
  if (element !== null && element !== undefined) {
    await deepReady(element, true)

    const webComponents = Array.prototype.slice
      .call(element.querySelectorAll('*'))
      .filter(el => el.tagName.match(/^bal/i))

    await Promise.all(
      webComponents.map(c => {
        if (c.configChanged !== null && c.configChanged !== undefined) {
          return c.configChanged(config)
        }
      }),
    )
  }

  await Promise.all([waitAfterFramePaint(), waitAfterLargestContentfulPaintCallback(), waitAfterIdleCallback()])
}

export const waitAfterFramePaint = () => {
  return new Promise(resolve => raf(() => runHighPrioritizedTask(resolve)))
}

export const waitAfterIdleCallback = () => {
  return new Promise(resolve => rIC(() => runHighPrioritizedTask(resolve)))
}

export const waitAfterLargestContentfulPaintCallback = () => {
  return new Promise(resolve => rLCP(() => runHighPrioritizedTask(resolve)))
}

export const waitOnLoadEventCallback = () => {
  return new Promise(resolve => rOnLoad(() => runHighPrioritizedTask(resolve)))
}

export const runHighPrioritizedTask = (callback: (value: unknown) => void) => {
  if (balBrowser.hasWindow && 'MessageChannel' in window) {
    const messageChannel = new (window as any).MessageChannel()
    messageChannel.port1.onmessage = callback
    messageChannel.port2.postMessage(undefined)
  } else {
    setTimeout(callback, 32)
  }
}

export const waitForRequestIdleCallback = () => {
  console.log('DEPRECATED - use waitAfterIdleCallback instead')
  return waitAfterIdleCallback
}
