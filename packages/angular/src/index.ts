export type { BaloiseDesignSystemAngularConfig } from './utils/config'
export type { ProxyComponent } from './utils/utils'

export { AngularDelegate } from './providers/angular-delegate'
export { BalBreakpointsService } from './providers/breakpoints.service'
export { BalConfigService } from './providers/config.service'
export { BalOrientationService } from './providers/orientation.service'
export { OverlayBaseController } from './providers/overlay'

export {
  BalTokenBreakpoints,
  BalTokenBreakpointSubject,
  BalTokenConfig,
  BalTokenDevice,
  BalTokenModal,
  BalTokenOrientationSubject,
  BalTokenSnackbar,
  BalTokenToast,
  BalTokenUserConfig,
} from './utils/token'

export { element, parseCustomEvent, raf } from './utils/utils'

export { BalModalService } from './providers/modal.service'
export { BalSnackbarService } from './providers/snackbar.service'
export { BalToastService } from './providers/toast.service'

export * from './bundles'
export * from './components'
export * from './generated/proxies'

export { BalNgErrorComponent } from './directives/error.component'
export { BalAutoFocus } from './directives/focus.directive'

export { provideBaloiseDesignSystem } from './provide'
