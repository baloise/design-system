import { initialize } from '@baloise/design-system-components'

import type { BaloiseDesignSystemAngularConfig } from '@baloise/design-system-components-angular/common'

export const appInitialize = (config: BaloiseDesignSystemAngularConfig, doc: Document) => {
  return (): any => {
    const win: Window | undefined = doc.defaultView as any
    if (win && typeof (window as any) !== 'undefined') {
      initialize(config.defaults)
    }
  }
}
