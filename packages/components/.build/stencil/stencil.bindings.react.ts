import { reactOutputTarget } from '@stencil/react-output-target'

export const ReactGenerator = () =>
  reactOutputTarget({
    componentCorePackage: '@baloise/design-system-next-components',
    proxiesFile: '../components-react/src/components.ts',
    includeDefineCustomElements: false,
    excludeComponents: [
      'bal-doc-app',
      'bal-doc-color',
      'bal-doc-download',
      'bal-doc-github',
      'bal-doc-icons',
      'bal-doc-image',
      'bal-doc-shades',
      'bal-doc-support-color',
    ],
  })
