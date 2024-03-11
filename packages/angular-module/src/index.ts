export type { ProxyComponent, BaloiseDesignSystemAngularConfig } from '@baloise/ds-angular-common'

export {
  AngularDelegate,
  BalBreakpointsService,
  BalConfigService,
  BalModalService,
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
} from '@baloise/ds-angular-common'

export * from './generated/proxies'
export { BooleanValueAccessor } from './generated/boolean-value-accessor'
export { NumericValueAccessor } from './generated/number-value-accessor'
export { SelectValueAccessor } from './generated/select-value-accessor'
export { TextValueAccessor } from './generated/text-value-accessor'

export { BalNgErrorComponent } from './directives/error.component'
export { BalAutoFocus } from './directives/focus.directive'

export { BaloiseDesignSystemModule } from './module'
