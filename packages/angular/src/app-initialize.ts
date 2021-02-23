import { NgZone } from '@angular/core'
import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'

let didInitialize = false

declare const __zone_symbol__requestAnimationFrame: any
declare const requestAnimationFrame: any

export const raf = (h: any) => {
  if (typeof __zone_symbol__requestAnimationFrame === 'function') {
    return __zone_symbol__requestAnimationFrame(h)
  }
  if (typeof requestAnimationFrame === 'function') {
    return requestAnimationFrame(h)
  }
  return setTimeout(h)
}

export const appInitialize = (doc: Document, zone: NgZone) => {
  return (): any => {
    const win: Window | undefined = doc.defaultView as any
    if (win && typeof (window as any) !== 'undefined') {
      if (didInitialize) {
        console.warn(
          'Baloise UI Library Angular was already initialized. Make sure BalUILibraryModule.forRoot() is just called once.',
        )
      }
      didInitialize = true

      const aelFn =
        '__zone_symbol__addEventListener' in (doc.body as any) ? '__zone_symbol__addEventListener' : 'addEventListener'

      return applyPolyfills().then(() => {
        return defineCustomElements(win, {
          syncQueue: true,
          raf,
          jmp: (h: any) => zone.runOutsideAngular(h),
          ael(elm, eventName, cb, opts) {
            ;(elm as any)[aelFn](eventName, cb, opts)
          },
          rel(elm, eventName, cb, opts) {
            elm.removeEventListener(eventName, cb, opts)
          },
        })
      })
    }
  }
}
