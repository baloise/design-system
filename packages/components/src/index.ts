/**
 * Config
 */
export * from './utils/config'

/**
 * Components
 */
export { Components, JSX } from './components'

/**
 * Types
 */
export * from './components/form/bal-select/utils/bal-option.type'
export * from './components/bal-tabs/bal-tab.type'
export * from './components/bal-steps/bal-step.type'
export * from './components/form/bal-file-upload/bal-file-upload.type'
export * from './components/notice/bal-modal/bal-modal.type'
export * from './components/form/bal-checkbox/bal-checkbox.type'
export * from './components/form/bal-radio/bal-radio.type'

/**
 * Utils
 */
export { initializeBaloiseDesignSystem } from './initialize'
export { NewBalOptionValue, NewBalSingleOptionValue } from './components/form/bal-select/utils/bal-option.util'
export {
  waitForComponent,
  waitForDesignSystem,
  waitAfterFramePaint,
  waitAfterIdleCallback,
  shallowReady,
  deepReady,
  wait,
  getAppRoot,
  componentOnReady,
  isDescendant,
} from './utils/helpers'

export { scrollToFirstInvalidField } from './utils/form'
export { ScrollHandler } from './utils/scroll'
export { newBalStepOption } from './components/bal-steps/bal-step.util'
export { newBalTabOption } from './components/bal-tabs/bal-tab.util'
export { newBalCheckboxOption } from './components/form/bal-checkbox/utils/bal-checkbox.util'
export { newBalRadioOption } from './components/form/bal-radio/utils/bal-radio.util'
export {
  balBreakpoints,
  Breakpoint,
  BreakpointsHandler,
  Breakpoints,
  BreakpointsHandlerCallback,
  initialBreakpoints,
  BreakpointsHandlerType,
} from './utils/breakpoints'
export { balBrowser } from './utils/browser'
export { balDevice } from './utils/device'

// deprecated
export { isPlatform, getPlatforms, Platforms, PlatformSrcSet } from './utils/platform'
export { isBrowser, hasTouchSupport } from './utils/legacy'

/**
 * Controllers
 */
export * from './components/notice/bal-toast/bal-toast.controller'
export * from './components/notice/bal-snackbar/bal-snackbar.controller'
export * from './components/notice/bal-modal/bal-modal.controller'
