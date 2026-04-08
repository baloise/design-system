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
export { Components, JSX } from './components'

/**
 * Types
 */
// export * from './components/checkbox/checkbox.type'
// export * from './components/file-upload/file-upload.type'
// export * from './components/modal/modal.type'
// export * from './components/radio/radio.type'
// export * from './components/select/utils/option.type'
// export * from './components/steps/step.type'
// export * from './components/tabs/tab.type'

/**
 * i18n
 */
export * from './components/close/close.i18n'
export * from './components/label/label.i18n'
// export * from './components/date/date.i18n'
// export * from './components/field/field-label/field-label.i18n'
// export * from './components/input-stepper/input-stepper.i18n'
// export * from './components/time-input/time-input.i18n'

/**
 * Utils
 */
// export { newBalCheckboxOption } from './components/checkbox/utils/checkbox.util'
// export { newBalRadioOption } from './components/radio/utils/radio.util'
// export { newBalOptionValue, newBalSingleOptionValue } from './components/select/utils/option.util'
// export { newBalStepOption } from './components/steps/step.util'
// export { newBalTabOption } from './components/tabs/tab.util'
export { initializeBaloiseDesignSystem as initialize, initializeBaloiseDesignSystem } from './initialize'
export {
  BalBreakpointObserver,
  dsBreakpoints,
  BalBreakpoints,
  dsBreakpointSubject,
  BalBreakpointSubject,
  BalBreakpointsUtil,
} from './utils/breakpoints'
export { dsBrowser } from './utils/browser'
export { BalDate } from './utils/date'
export { dsDevice, BalDevice } from './utils/device'
// export { newBalOption } from './utils/dropdown/option'
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
// export { INVALID_VALUE } from './utils/mask/mask-util'
export {
  BalOrientationInfo,
  BalOrientationObserver,
  dsOrientationSubject,
  BalOrientationSubject,
} from './utils/orientation'
export { BalScrollHandler } from './utils/scroll'
export { BalSwipeInfo, BalSwipeObserver, BalSwipeSubject } from './utils/swipe'

/**
 * Controllers
 */
// export * from './components/modal/modal.controller'
export * from './components/alert/alert.controller'
