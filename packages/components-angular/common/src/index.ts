export type { BaloiseDesignSystemAngularConfig } from './utils/config'
export type { ProxyComponent } from './utils/utils'

export { AngularDelegate } from './providers/angular-delegate'
export { BalBreakpointsService } from './providers/breakpoints.service'
export { BalConfigService } from './providers/config.service'
export { BalModalService } from './providers/modal.service'
export { BalOrientationService } from './providers/orientation.service'
export { BalSnackbarService } from './providers/snackbar.service'
export { BalToastService } from './providers/toast.service'

export { BalNgErrorComponent } from './directives/error.component'
export { BalAutoFocus } from './directives/focus.directive'

export {
  BalTokenUserConfig,
  BalTokenConfig,
  BalTokenToast,
  BalTokenSnackbar,
  BalTokenModal,
  BalTokenBreakpoints,
  BalTokenBreakpointSubject,
  BalTokenDevice,
  BalTokenOrientationSubject,
} from './utils/token'

export { raf, parseCustomEvent, element } from './utils/utils'
