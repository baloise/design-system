import { bootstrapDesignSystem as bootstrapCore } from './bootstrap'
import { initializeAssetPath } from './asset-path'

/**
 * Browser variant of {@link bootstrapCore}, which additionally sets the asset path the components
 * resolve their static assets from. Lives in its own module so the Node (`index.server.ts`) entry
 * keeps the plain variant — see `asset-path.ts` for why that import must stay browser-only.
 *
 * @deprecated Use `DsRootProvider` instead. Wrap the application in `<DsRootProvider>` and pass
 * brand, region, language, and other config as props.
 */
export const bootstrapDesignSystem = (config: Parameters<typeof bootstrapCore>[0] = {}) => {
  bootstrapCore(config)
  initializeAssetPath()
}
