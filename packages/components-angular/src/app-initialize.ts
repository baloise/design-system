import { NgZone } from '@angular/core'
import { initializeBaloiseDesignSystem } from '@baloise/design-system-components'

import { raf } from '@baloise/design-system-components-angular/common'
import type { BaloiseDesignSystemAngularConfig } from '@baloise/design-system-components-angular/common'

export const appInitialize = (config: BaloiseDesignSystemAngularConfig, doc: Document, zone: NgZone) => {
  return (): any => {
    const win: Window | undefined = doc.defaultView as any

    if (win && typeof (window as any) !== 'undefined') {
      const aelFn =
        '__zone_symbol__addEventListener' in (doc.body as any) ? '__zone_symbol__addEventListener' : 'addEventListener'

      initializeBaloiseDesignSystem(
        {
          ...config.defaults,
          _raf: raf,
          _jmp: (h: any) => zone.runOutsideAngular(h),
          _ael(elm, eventName, cb, opts) {
            if (elm && (elm as any)[aelFn]) {
              ;(elm as any)[aelFn](eventName, cb, opts)
            }
          },
          _rel(elm, eventName, cb, opts) {
            if (elm) {
              elm.removeEventListener(eventName, cb, opts)
            }
          },
        },
        win,
      )
    }
  }
}
