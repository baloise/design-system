import { reactOutputTarget } from '@baloise/react-output-target'

export const ReactGenerator = () =>
  reactOutputTarget({
    componentCorePackage: '@baloise/design-system-next-components',
    proxiesFile: '../components-react/src/components.ts',
    includeDefineCustomElements: true,
    excludeComponents: [
      'bal-doc-app',
      'bal-doc-banner',
      'bal-doc-color',
      'bal-doc-download',
      'bal-doc-github',
      'bal-doc-icons',
      'bal-doc-image',
      'bal-doc-shades',
      'bal-doc-support-color',
      'bal-doc-lead',
      'bal-doc-tabs',
      'bal-doc-usage',
      'bal-doc-usage-item',
      'bal-doc-link-list',
      'bal-doc-link-list-item',
      'bal-doc-link-tabs',
      'bal-doc-link-usage',
      'bal-doc-link-usage-item',
    ],
  })
