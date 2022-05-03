import { reactOutputTarget } from '@baloise/react-output-target'
import { docComponents } from './doc.components'

export const ReactGenerator = () =>
  reactOutputTarget({
    componentCorePackage: '@baloise/design-system-next-components',
    proxiesFile: '../components-react/src/components.ts',
    includeDefineCustomElements: true,
    excludeComponents: docComponents,
  })
