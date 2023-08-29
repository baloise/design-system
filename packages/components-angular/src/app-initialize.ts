import { NgZone } from '@angular/core'
import { BalConfig, initialize } from '@baloise/design-system-components'
import { applyPolyfills, defineCustomElements } from '@baloise/design-system-components/loader'
import { raf } from './util/util'

export interface BaloiseDesignSystemAngularConfig {
  applyPolyfills?: boolean
  defaults?: BalConfig
  forms?: {
    setInvalid: boolean
  }
}

export const appInitialize = (config: BaloiseDesignSystemAngularConfig, doc: Document, zone: NgZone) => {
  return (): any => {
    const win: Window | undefined = doc.defaultView as any
    if (win && typeof (window as any) !== 'undefined') {
      initialize(config.defaults)

      const aelFn =
        '__zone_symbol__addEventListener' in (doc.body as any) ? '__zone_symbol__addEventListener' : 'addEventListener'

      return applyPolyfills().then(() => {
        return defineCustomElements(win, {
          syncQueue: true,
          raf,
          jmp: (h: any) => zone.runOutsideAngular(h),
          ael(elm, eventName, cb, opts) {
            if (elm && (elm as any)[aelFn]) {
              ;(elm as any)[aelFn](eventName, cb, opts)
            }
          },
          rel(elm, eventName, cb, opts) {
            if (elm) {
              elm.removeEventListener(eventName, cb, opts)
            }
          },
        })
      })
    }
  }
}
