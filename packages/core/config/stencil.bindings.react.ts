import { reactOutputTarget } from '@stencil/react-output-target'

export const ReactGenerator = (): any =>
  reactOutputTarget({
    outDir: '../react/src/generated',
    customElementsDir: 'components',
  })
