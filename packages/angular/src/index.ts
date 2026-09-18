import { DsConfig, initializeDesignSystem } from '@baloise/ds-core'
import { setAssetPath } from '@baloise/ds-core/components'

interface DsAngularConfig {
  defaults?: DsConfig
}

export const bootstrapDesignSystem = (config: DsAngularConfig = {}) => {
  initializeDesignSystem({
    ...config.defaults,
    httpFormSubmit: false,
  })

  // Works around a bundler incompatibility in Stencil's own `resourcesUrl` auto-detection — see
  // packages/core/CONTEXT.md's "Asset path (`resourcesUrl`)" section for the full explanation.
  //
  // Deliberately imports `setAssetPath` from `@baloise/ds-core/components` here, not from
  // `@baloise/ds-core`/`@stencil/core` inside `initializeDesignSystem` itself: `dist-custom-elements`
  // (`components/`, what `@baloise/ds-angular`'s generated proxies actually import from) is built with
  // `externalRuntime: false`, which inlines its own separate copy of Stencil's platform runtime rather
  // than importing the shared one `@baloise/ds-core`'s lazy build uses. Calling `setAssetPath` through
  // any other entry point sets `resourcesUrl` on a *different* runtime instance than the one
  // `ds-input-phone.js` actually reads from — confirmed by reproducing this exact mismatch first with
  // `initializeDesignSystem` living in core, before moving the fix here.
  // Anchored on `document.baseURI`, not `window.location.href`: the latter always resolves to the
  // domain root, breaking any app deployed under a subpath (e.g. `<base href="/my-app/">`). The extra
  // `'x/'` segment exists so the single `../` a component's `getAssetPath()` call prepends cancels
  // back to the app's own base rather than skipping past it into the parent path.
  setAssetPath(new URL('x/', document.baseURI).href)
}
// A named export (e.g. `DsInput` below) always wins over a colliding `export *` regardless of statement
// order, so this override doesn't depend on where it's placed relative to './generated/proxies' — it's
// listed after purely for readability, to read as "the generated proxies, then their overrides".
export * from './generated/proxies'
export * from './forms/value-accessor'
export { DsInput } from './forms/ds-input'
export { DsTextarea } from './forms/ds-textarea'
export { DsNumberInput } from './forms/ds-number-input'
export { DsInputSlider } from './forms/ds-input-slider'
export { DsInputStepper } from './forms/ds-input-stepper'
export { DsSegment } from './forms/ds-segment'
export { DsDate } from './forms/ds-date'
export { DsCheckboxGroup } from './forms/ds-checkbox-group'
export { DsRadioGroup } from './forms/ds-radio-group'
export { DsFileUpload } from './forms/ds-file-upload'
export { DsSelect } from './forms/ds-select'
export { DsInputPhone } from './forms/ds-input-phone'
