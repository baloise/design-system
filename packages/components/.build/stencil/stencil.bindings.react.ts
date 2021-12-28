import { reactOutputTarget } from '@stencil/react-output-target'

export const ReactGenerator = () =>
  reactOutputTarget({
    componentCorePackage: '@baloise/design-system-next-components',
    proxiesFile: '../components-react/src/components.ts',
    includeDefineCustomElements: false,
  })
