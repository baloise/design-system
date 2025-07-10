/**
 * Config
 */
export {
  attachToConfig,
  BalConfig,
  BalConfigObserver,
  BalConfigState,
  BalGermanLanguage,
  BalIcons,
  BalLanguage,
  BalLuxembourgInternationalLanguage,
  BalLuxembourgLanguage,
  BalPlatformConfig,
  BalRegion,
  BalSwissLanguage,
  defaultConfig,
  detachFromConfig,
  onBalConfigChange,
  setupConfig,
  updateBalAllowedLanguages,
  updateBalAnimated,
  updateBalIcons,
  updateBalLanguage,
  updateBalRegion,
  useBalConfig,
} from './utils/config'

/**
 * Components
 */
export { Components, JSX } from './components';
export * from './components'

/**
 * Types
 */
export * from './components/bal-checkbox/bal-checkbox.type'
export * from './components/bal-file-upload/bal-file-upload.type'
export * from './components/bal-modal/bal-modal.type'
export * from './components/bal-radio/bal-radio.type'
export * from './components/bal-select/utils/bal-option.type'
export * from './components/bal-steps/bal-step.type'
export * from './components/bal-tabs/bal-tab.type'

/**
 * i18n
 */
export * from './components/bal-close/bal-close.i18n'
export * from './components/bal-date/bal-date.i18n'
export * from './components/bal-field/bal-field-label/bal-field-label.i18n'
export * from './components/bal-input-stepper/bal-input-stepper.i18n'
export * from './components/bal-label/bal-label.i18n'
export * from './components/bal-time-input/bal-time-input.i18n'

/**
 * Utils
 */
export { newBalCheckboxOption } from './components/bal-checkbox/utils/bal-checkbox.util'
export { newBalRadioOption } from './components/bal-radio/utils/bal-radio.util'
export { newBalOptionValue, newBalSingleOptionValue } from './components/bal-select/utils/bal-option.util'
export { newBalStepOption } from './components/bal-steps/bal-step.util'
export { newBalTabOption } from './components/bal-tabs/bal-tab.util'
export { initializeBaloiseDesignSystem as initialize, initializeBaloiseDesignSystem } from './initialize'
export {
  BalBreakpointObserver,
  balBreakpoints,
  BalBreakpoints,
  balBreakpointSubject,
  BalBreakpointSubject,
  BalBreakpointsUtil,
} from './utils/breakpoints'
export { balBrowser } from './utils/browser'
export { BalDate } from './utils/date'
export { balDevice, BalDevice } from './utils/device'
export { newBalOption } from './utils/dropdown/option'
export { scrollToFirstInvalidField } from './utils/form'
export {
  componentOnReady,
  deepReady,
  getAppRoot,
  isDescendant,
  shallowReady,
  wait,
  waitAfterFramePaint,
  waitAfterIdleCallback,
  waitAfterLargestContentfulPaintCallback,
  waitForComponent,
  waitForDesignSystem,
  waitOnLoadEventCallback,
} from './utils/helpers'
export { INVALID_VALUE } from './utils/mask/mask-util'
export {
  BalOrientationInfo,
  BalOrientationObserver,
  balOrientationSubject,
  BalOrientationSubject,
} from './utils/orientation'
export { BalScrollHandler } from './utils/scroll'
export { BalSwipeInfo, BalSwipeObserver, BalSwipeSubject } from './utils/swipe'

/**
 * Controllers
 */
export * from './components/bal-modal/bal-modal.controller'
export * from './components/bal-snackbar/bal-snackbar.controller'
export * from './components/bal-toast/bal-toast.controller'

/**
 * Events
 */

/**
 * deprecated
 */
export {
  getPlatforms,
  hasTouchSupport,
  isBrowser,
  isPlatform,
  NewBalOptionValue,
  NewBalSingleOptionValue,
  Platforms,
  PlatformSrcSet,
} from './utils/legacy'
