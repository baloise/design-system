import { bootstrapDesignSystem as bootstrapCore } from './bootstrap'

/**
 * Browser entry point re-export of {@link bootstrapCore}. Lives in its own module, kept separate
 * from the Node (`index.server.ts`) entry's plain variant, as a seam for any future browser-only
 * side effect the client entry point needs but the server entry must not statically import.
 *
 * @deprecated Use `DsRootProvider` instead. Wrap the application in `<DsRootProvider>` and pass
 * brand, region, language, and other config as props.
 */
export const bootstrapDesignSystem = (config: Parameters<typeof bootstrapCore>[0] = {}) => {
  bootstrapCore(config)
}
