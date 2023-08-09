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
  initStyleMode,
  initialize,
  BalConfig,
  BalConfigState,
  BalConfigObserver,
  BalMode,
  BalRegion,
  BalLanguage,
  BalSwissLanguage,
  BalLuxembourgLanguage,
  BalLuxembourgInternationalLanguage,
  BalGermanLanguage,
  BalIcons,
} from './utils/config'

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
 * i18n
 */
export * from './components/bal-close/bal-close.i18n'
export * from './components/form/bal-field/bal-field-label/bal-field-label.i18n'
export * from './components/form/bal-datepicker/bal-datepicker.i18n'
export * from './components/form/bal-time-input/bal-time-input.i18n'
export * from './components/typography/bal-label/bal-label.i18n'

/**
 * Utils
 */
export { initializeBaloiseDesignSystem } from './initialize'
export { newBalStepOption } from './components/bal-steps/bal-step.util'
export { newBalTabOption } from './components/bal-tabs/bal-tab.util'
export { newBalCheckboxOption } from './components/form/bal-checkbox/utils/bal-checkbox.util'
export { newBalRadioOption } from './components/form/bal-radio/utils/bal-radio.util'
export { newBalOptionValue, newBalSingleOptionValue } from './components/form/bal-select/utils/bal-option.util'
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
export { balDevice } from './utils/device'
export { balBreakpoints, BalBreakpointObserver, BalBreakpoints, balBreakpointSubject } from './utils/breakpoints'
export { BalOrientationObserver, BalOrientationInfo, balOrientationSubject } from './utils/orientation'
export { BalSwipeObserver, BalSwipeInfo, BalSwipeSubject } from './utils/swipe'

/**
 * Controllers
 */
export * from './components/notice/bal-toast/bal-toast.controller'
export * from './components/notice/bal-snackbar/bal-snackbar.controller'
export * from './components/notice/bal-modal/bal-modal.controller'

/**
 * deprecated
 */
export { isPlatform, getPlatforms, Platforms, PlatformSrcSet } from './utils/legacy'
export { isBrowser, hasTouchSupport, NewBalOptionValue, NewBalSingleOptionValue } from './utils/legacy'
