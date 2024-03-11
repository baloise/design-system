import { importProvidersFrom } from '@angular/core'

import { BaloiseDesignSystemModule } from '@baloise/ds-angular'

export { BaloiseDesignSystemModule, BalModalService } from '@baloise/ds-angular'

export const balImports = [BaloiseDesignSystemModule]

export const balProviders = [importProvidersFrom(BaloiseDesignSystemModule.forRoot())]
