import { EventEmitter } from '@stencil/core'
import { isWindowDefined } from './browser'
import { BalConfig } from './config'

declare const __zone_symbol__requestAnimationFrame: any
declare const requestAnimationFrame: any

export const rIC = (callback: () => void) => {
  if (isWindowDefined() && 'requestIdleCallback' in window) {
    ;(window as any).requestIdleCallback(callback)
  } else {
    setTimeout(callback, 32)
  }
}

export const wait = (ms = 0): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}

export const debounceEvent = (event: EventEmitter, wait: number): EventEmitter => {
  const original = (event as any)._original || event
  return {
    _original: event,
    emit: debounce(original.emit.bind(original), wait),
  } as EventEmitter
}

export const debounce = (func: (...args: any[]) => void, wait = 0) => {
  let timer: any
  return (...args: any[]): any => {
    clearTimeout(timer)
    timer = setTimeout(func, wait, ...args)
  }
}

export const findItemLabel = (componentEl: HTMLElement): HTMLLabelElement | null => {
  const fieldLabelEl = componentEl.closest('bal-field')
  if (fieldLabelEl) {
    return fieldLabelEl.querySelector('label')
  }
  return null
}

export const hasTagName = (element: any, tag: string) => {
  return element && element.tagName && element.tagName === tag.toUpperCase()
}

export const isDescendant = (parent: HTMLElement, child: HTMLElement | EventTarget) => {
  let node = (child as any).parentNode
  while (node != null) {
    if (node == parent) {
      return true
    }
    node = node.parentNode
  }
  return false
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
  if (el.componentOnReady) {
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

export const transitionEndAsync = (el: HTMLElement | null, expectedDuration = 0) => {
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
const transitionEnd = (el: HTMLElement | null, expectedDuration = 0, callback: (ev?: TransitionEvent) => void) => {
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

export const waitForComponent = async (el: HTMLElement | null) => {
  await deepReady(el, true)
  await wait(20)
}

export const addEventListener = (el: any, eventName: string, callback: any, opts?: any) => {
  return el.addEventListener(eventName, callback, opts)
}

export const removeEventListener = (el: any, eventName: string, callback: any, opts?: any) => {
  return el.removeEventListener(eventName, callback, opts)
}

export const waitForDesignSystem = async (el: any | null, _config?: BalConfig): Promise<void> => {
  const config: any = { animated: false, icons: {}, ..._config }
  const element = el as any
  if (element) {
    const webComponents = Array.prototype.slice
      .call(element.querySelectorAll('*'))
      .filter(el => el.tagName.match(/^bal/i))

    await Promise.all(webComponents.map(c => c.componentOnReady()))
    await Promise.all(
      webComponents.map(c => {
        if (c.configChanged) {
          return c.configChanged(config)
        }
      }),
    )
  }
  await wait(20)
}
