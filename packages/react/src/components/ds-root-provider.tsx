'use client'

import { DsRoot } from '../generated/components'
import { createDsRootProvider } from './ds-root-provider.shared'

export type { DsRootProviderProps } from './ds-root-provider.shared'

export const DsRootProvider = createDsRootProvider(DsRoot)
