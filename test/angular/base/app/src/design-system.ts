import { importProvidersFrom } from '@angular/core'

import { BaloiseDesignSystemModule, BalModalService, provideBaloiseDesignSystem } from '@baloise/ds-angular'

export { BaloiseDesignSystemModule, BalModalService } from '@baloise/ds-angular'

export const balImports = [BaloiseDesignSystemModule]

export const balProviders = [importProvidersFrom(BaloiseDesignSystemModule.forRoot()),
provideBaloiseDesignSystem({
  defaults: {
    brand: 'helvetia',
  },
}),
]
