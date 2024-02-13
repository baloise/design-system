export type { ProxyComponent, BaloiseDesignSystemAngularConfig } from '@baloise/design-system-components-angular/common'

export {
  AngularDelegate,
  BalBreakpointsService,
  BalConfigService,
  BalOrientationService,
  raf,
  parseCustomEvent,
  element,
  BalTokenUserConfig,
  BalTokenConfig,
  BalTokenModal,
  BalTokenBreakpoints,
  BalTokenBreakpointSubject,
  BalTokenDevice,
  BalTokenToast,
  BalTokenSnackbar,
  BalTokenOrientationSubject,
} from '@baloise/design-system-components-angular/common'

export { BalModalService } from './providers/modal.service'
export { BalToastService } from './providers/toast.service'
export { BalSnackbarService } from './providers/snackbar.service'

export * from './generated/proxies'
export * from './components'
export * from './bundles'

export { BalNgErrorComponent } from './directives/error.component'
export { BalAutoFocus } from './directives/focus.directive'

export { provideBaloiseDesignSystem } from './provide'
