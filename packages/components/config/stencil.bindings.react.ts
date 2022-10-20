import { reactOutputTarget } from '@baloise/design-system-output-target-react'
import { docComponents } from './doc.components'

export const ReactGenerator = () =>
  reactOutputTarget({
    componentCorePackage: '@baloise/design-system-components',
    proxiesFile: '../components-react/src/components.ts',
    includeDefineCustomElements: true,
    excludeComponents: docComponents,
  })
