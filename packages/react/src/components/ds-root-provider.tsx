'use client'

import { DsRoot } from '../generated/components'
import { createDsRootProvider } from './ds-root-provider.shared'
import { initializeAssetPath } from '../asset-path'

export type { DsRootProviderProps } from './ds-root-provider.shared'

export const DsRootProvider = createDsRootProvider(DsRoot, initializeAssetPath)
