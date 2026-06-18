/**
 * Config
 */
export * from './global/config'

/**
 * Components
 */
export { Components, JSX } from './components'

/**
 * Types
 */
// TODO: export all interfaces
export * from './components/modal/modal.interfaces'
export * from './components/footer/footer.interfaces'

/**
 * i18n
 */
export * from './components/close/close.i18n'
export * from './components/footer/footer.i18n'
export * from './components/label/label.i18n'
export * from './components/pagination/pagination.i18n'

/**
 * Utils
 */
export { initializeDesignSystem as initialize, initializeDesignSystem } from './global/initialize'
export {
  dsBreakpoints,
  dsBreakpointSubject,
  DsBreakpointObserver,
  DsBreakpoints,
  DsBreakpointSubject,
  DsBreakpointsUtil,
} from './utils/breakpoints'
export { dsBrowser } from './utils/browser'
export { DsDate } from './utils/date'
export { dsDevice, DsDevice } from './utils/device'
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
export {
  DsOrientationInfo,
  DsOrientationObserver,
  dsOrientationSubject,
  DsOrientationSubject,
} from './utils/orientation'
export { ScrollHandler } from './utils/scroll'
export { DsSwipeInfo, DsSwipeObserver, DsSwipeSubject } from './utils/swipe'

/**
 * Controllers
 */
export * from './components/modal/modal.controller'
export * from './components/alert/alert.controller'
