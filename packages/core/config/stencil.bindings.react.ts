import { reactOutputTarget } from '@baloise/output-target-react'
import { docComponents } from './doc.components'

export const ReactGenerator = () =>
  reactOutputTarget({
    outDir: '../react/src/generated',
    stencilPackageName: '@baloise/ds-core',
    excludeComponents: docComponents,
    hydrateModule: '@baloise/ds-core/hydrate',
  })
