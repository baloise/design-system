import { NgZone } from '@angular/core'

import type { BalPlatformConfig } from '@baloise/design-system-components/components'
import { initializeBaloiseDesignSystem } from '@baloise/design-system-components/components'

import { raf } from '@baloise/design-system-components-angular/common'
import type { BaloiseDesignSystemAngularConfig } from '@baloise/design-system-components-angular/common'

export const appInitialize = (config: BaloiseDesignSystemAngularConfig, doc: Document, zone: NgZone) => {
  return async (): Promise<void> => {
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

      initializeBaloiseDesignSystem(config.defaults, platformConfig, win)
    }
  }
}
