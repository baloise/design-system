import { reactOutputTarget } from '@stencil/react-output-target'

import { recommendedSerializeShadowRoot } from './hydrate-defaults'

export const ReactGenerator = (): any =>
  reactOutputTarget({
    outDir: '../react/src/generated',
    customElementsDir: 'components',
    hydrateModule: '@helvetia-design/core/hydrate',
    /**
     * Required by `@stencil/react-output-target` whenever `hydrateModule` is set.
     * The generated `components.server.ts` namespace-imports the sibling client wrappers.
     */
    clientModule: './components.js',
    /**
     * Imported from source (not `@helvetia-design/core/hydrate-defaults`) because this file runs
     * during the Stencil build, before that subpath's own tsc pass has produced output - see
     * docs/adr/0034-ssr-mixed-serialize-shadow-root.md. Bakes the same mixed scoped/DSD default
     * into every `@helvetia-design/react` Server Component wrapper (`components.server.ts`), so
     * Next.js consumers (e.g. apps/integration-next) get it automatically, with no per-call
     * config of their own.
     */
    serializeShadowRoot: recommendedSerializeShadowRoot,
  })
