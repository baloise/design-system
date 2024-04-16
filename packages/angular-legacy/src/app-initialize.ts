/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgZone } from '@angular/core'
import { initializeBaloiseDesignSystem } from '@baloise/ds-core'
import { defineCustomElements } from '@baloise/ds-core/loader'
import { raf } from '@baloise/ds-angular-common'

import type { BaloiseDesignSystemAngularConfig } from '@baloise/ds-angular-common'

export const appInitialize = (config: BaloiseDesignSystemAngularConfig, doc: Document, zone: NgZone) => {
  return (): any => {
    const win: Window | undefined = doc.defaultView as any

    if (win && typeof (window as any) !== 'undefined') {
      initializeBaloiseDesignSystem(
        {
          ...config.defaults,
          httpFormSubmit: false,
        },
        undefined,
        win,
      )

      const aelFn =
        '__zone_symbol__addEventListener' in (doc.body as any) ? '__zone_symbol__addEventListener' : 'addEventListener'

      return defineCustomElements(win, {
        syncQueue: true,
        raf,
        jmp: (h: any) => zone.runOutsideAngular(h),
        ael(elm, eventName, cb, opts) {
          if (elm && (elm as any)[aelFn]) {
            // eslint-disable-next-line @typescript-eslint/no-extra-semi
            ;(elm as any)[aelFn](eventName, cb, opts)
          }
        },
        rel(elm, eventName, cb, opts) {
          if (elm) {
            elm.removeEventListener(eventName, cb, opts)
          }
        },
      })
    }
  }
}
