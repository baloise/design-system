import { reactOutputTarget } from '@baloise/output-target-react'
import { docComponents } from './doc.components'

export const ReactGenerator = (): any =>
  reactOutputTarget({
    componentCorePackage: '@baloise/ds-core',
    proxiesFile: '../react/src/generated/proxies.ts',
    includeDefineCustomElements: true,
    excludeComponents: docComponents,
  })
