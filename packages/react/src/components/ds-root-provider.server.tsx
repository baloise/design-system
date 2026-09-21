import { DsRoot } from '../generated/components.server'
import { createDsRootProvider } from './ds-root-provider.shared'

export type { DsRootProviderProps } from './ds-root-provider.shared'

export const DsRootProvider = createDsRootProvider(DsRoot)
