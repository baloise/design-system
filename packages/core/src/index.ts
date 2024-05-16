/**
 * Config
 */
export {
  attachToConfig,
  detachFromConfig,
  defaultConfig,
  updateBalAllowedLanguages,
  updateBalAnimated,
  updateBalIcons,
  updateBalLanguage,
  updateBalRegion,
  onBalConfigChange,
  useBalConfig,
  setupConfig,
  BalConfig,
  BalConfigState,
  BalConfigObserver,
  BalRegion,
  BalLanguage,
  BalSwissLanguage,
  BalLuxembourgLanguage,
  BalLuxembourgInternationalLanguage,
  BalGermanLanguage,
  BalIcons,
  BalPlatformConfig,
} from './utils/config'

/**
 * Components
 */
export { Components, JSX } from './components'

/**
 * Types
 */
export * from './components/bal-select/utils/bal-option.type'
export * from './components/bal-tabs/bal-tab.type'
export * from './components/bal-steps/bal-step.type'
export * from './components/bal-file-upload/bal-file-upload.type'
export * from './components/bal-modal/bal-modal.type'
export * from './components/bal-checkbox/bal-checkbox.type'
export * from './components/bal-radio/bal-radio.type'

/**
 * i18n
 */
export * from './components/bal-date/bal-date.i18n'
export * from './components/bal-close/bal-close.i18n'
export * from './components/bal-field/bal-field-label/bal-field-label.i18n'
export * from './components/bal-datepicker/bal-datepicker.i18n'
export * from './components/bal-time-input/bal-time-input.i18n'
export * from './components/bal-input-stepper/bal-input-stepper.i18n'
export * from './components/bal-label/bal-label.i18n'

/**
 * Utils
 */
export { initializeBaloiseDesignSystem as initialize, initializeBaloiseDesignSystem } from './initialize'
export { newBalOption } from './utils/dropdown/option'
export { newBalStepOption } from './components/bal-steps/bal-step.util'
export { newBalTabOption } from './components/bal-tabs/bal-tab.util'
export { newBalCheckboxOption } from './components/bal-checkbox/utils/bal-checkbox.util'
export { newBalRadioOption } from './components/bal-radio/utils/bal-radio.util'
export { newBalOptionValue, newBalSingleOptionValue } from './components/bal-select/utils/bal-option.util'
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
export { BalScrollHandler } from './utils/scroll'
export { balBrowser } from './utils/browser'
export { balDevice, BalDevice } from './utils/device'
export {
  balBreakpoints,
  balBreakpointSubject,
  BalBreakpointObserver,
  BalBreakpoints,
  BalBreakpointSubject,
  BalBreakpointsUtil,
} from './utils/breakpoints'
export {
  BalOrientationObserver,
  BalOrientationInfo,
  balOrientationSubject,
  BalOrientationSubject,
} from './utils/orientation'
export { BalSwipeObserver, BalSwipeInfo, BalSwipeSubject } from './utils/swipe'
export { BalDate } from './utils/date'
export { INVALID_VALUE } from './utils/mask/mask-util'

/**
 * Controllers
 */
export * from './components/bal-toast/bal-toast.controller'
export * from './components/bal-snackbar/bal-snackbar.controller'
export * from './components/bal-modal/bal-modal.controller'

/**
 * deprecated
 */
export { isPlatform, getPlatforms, Platforms, PlatformSrcSet } from './utils/legacy'
export { isBrowser, hasTouchSupport, NewBalOptionValue, NewBalSingleOptionValue } from './utils/legacy'
