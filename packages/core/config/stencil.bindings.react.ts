import { reactOutputTarget } from '@stencil/react-output-target'

export const ReactGenerator = (): any =>
  reactOutputTarget({
    outDir: '../react/src/generated',
    customElementsDir: 'components',
    hydrateModule: '@baloise/ds-core/hydrate',
    /**
     * Required by `@stencil/react-output-target` whenever `hydrateModule` is set.
     * The generated `components.server.ts` namespace-imports the sibling client wrappers.
     */
    clientModule: './components.js',
    serializeShadowRoot: 'declarative-shadow-dom',
  })
