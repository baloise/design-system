import { NgZone } from '@angular/core'

import type { BalPlatformConfig } from '@baloise/ds-core/components'
import { initializeBaloiseDesignSystem } from '@baloise/ds-core/components'

import type { BaloiseDesignSystemAngularConfig } from '@baloise/ds-angular-common'
import { raf } from '@baloise/ds-angular-common'

export const appInitialize = (config: BaloiseDesignSystemAngularConfig, doc: Document, zone: NgZone) => {
  return async (): Promise => {
    const win: Window | undefined = doc.defaultView as any

    if (win && typeof (window as any) !== 'undefined') {
      const aelFn =
        '__zone_symbol__addEventListener' in (doc.body as any) ? '__zone_symbol__addEventListener' : 'addEventListener'

      const platformConfig: BalPlatformConfig = {
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
      }

      initializeBaloiseDesignSystem(
        {
          ...config.defaults,
          httpFormSubmit: false,
          _generateHydrateForCustomElementsOutput: true,
        },
        platformConfig,
        win,
      )
    }
  }
}
