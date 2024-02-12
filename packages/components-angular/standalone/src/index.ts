export type { ProxyComponent, BaloiseDesignSystemAngularConfig } from '@baloise/design-system-components-angular/common'

export {
  AngularDelegate,
  BalBreakpointsService,
  BalConfigService,
  BalOrientationService,
  BalSnackbarService,
  BalToastService,
  raf,
  parseCustomEvent,
  element,
  BalTokenUserConfig,
  BalTokenConfig,
  BalTokenToast,
  BalTokenSnackbar,
  BalTokenModal,
  BalTokenBreakpoints,
  BalTokenBreakpointSubject,
  BalTokenDevice,
  BalTokenOrientationSubject,
} from '@baloise/design-system-components-angular/common'

export { BalModalService } from './providers/modal.service'
export * from './generated/proxies'
export * from './components'
export * from './bundles'

export { BalNgErrorComponent } from './directives/error.component'
export { BalAutoFocus } from './directives/focus.directive'

export { provideBaloiseDesignSystem } from './provide'
