import { BalComponentBundle, provideBaloiseDesignSystem } from '@baloise/ds-angular'

export { BalModalService } from '@baloise/ds-angular'

export const balImports = [...BalComponentBundle]

export const balProviders = [provideBaloiseDesignSystem()]
