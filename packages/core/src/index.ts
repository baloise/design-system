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
export * from './components/overlays/modal/modal.interfaces'
export * from './components/structure/app-footer/app-footer.interfaces'
export * from './components/overlays/sheet/sheet.interfaces'
export type { ComponentRef, FrameworkDelegate } from './utils/framework-delegate'

/**
 * i18n
 */
export * from './components/actions/close/close.i18n'
export * from './components/structure/app-footer/app-footer.i18n'
export * from './components/forms/label/label.i18n'
export * from './components/navigation/pagination/pagination.i18n'

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
  getRootElement,
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

/**
 * Controllers
 */
export * from './components/overlays/modal/modal.controller'
export * from './components/overlays/alert/alert.controller'
