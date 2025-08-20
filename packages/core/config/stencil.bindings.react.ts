import { reactOutputTarget } from '@stencil/react-output-target'
import { docComponents } from './doc.components'

export const ReactGenerator = (): any =>
  reactOutputTarget({
    outDir: '../react/src/generated',
    excludeComponents: docComponents,
    customElementsDir: 'components',
  })
