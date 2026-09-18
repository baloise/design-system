import { setAssetPath } from '@helvetia-design/core/components'

/**
 * Works around a bundler incompatibility in Stencil's own `resourcesUrl` auto-detection — see
 * packages/core/CONTEXT.md's "Asset path (`resourcesUrl`)" section for the full explanation.
 *
 * Deliberately imports `setAssetPath` from `@helvetia-design/core/components`, not from
 * `@helvetia-design/core`: `dist-custom-elements` (`components/`, what this package's generated proxies
 * actually import from) is built with `externalRuntime: false`, which inlines its own separate copy of
 * Stencil's platform runtime rather than importing the shared one `@helvetia-design/core`'s lazy build
 * uses. Calling `setAssetPath`
 * through any other entry point sets `resourcesUrl` on a *different* runtime instance than the one
 * `ds-input-phone.js` actually reads from.
 *
 * Anchored on `document.baseURI`, not `window.location.href`: the latter always resolves to the domain
 * root, breaking any app deployed under a subpath (e.g. `<base href="/my-app/">`). The extra `'x/'`
 * segment exists so the single `../` a component's `getAssetPath()` call prepends cancels back to the
 * app's own base rather than skipping past it into the parent path.
 *
 * Idempotent, so callers don't need to gate it behind their own init checks.
 */
export function initializeAssetPath() {
  setAssetPath(new URL('x/', document.baseURI).href)
}
