import { BalComponentBundle } from './generated/angular/bundles'
import { provideBaloiseDesignSystem } from './generated/angular/provide'

export { BalModalService } from './generated/angular/providers/modal.service'

export const balImports = [...BalComponentBundle]

export const balProviders = [provideBaloiseDesignSystem()]
