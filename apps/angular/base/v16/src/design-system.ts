import { importProvidersFrom } from '@angular/core'

import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular/legacy'

export { BaloiseDesignSystemModule, BalModalService } from '@baloise/design-system-components-angular/legacy'

export const balImports = [BaloiseDesignSystemModule]

export const balProviders = [importProvidersFrom(BaloiseDesignSystemModule.forRoot())]
