// COMPONENTS
export { BalNgErrorComponent } from './components/error/error.component'

// DIRECTIVES
export * from './generated/proxies'
export { BooleanValueAccessor } from './generated/boolean-value-accessor'
export { CheckboxValueAccessor } from './generated/checkbox-value-accessor'
export { NumericValueAccessor } from './generated/number-value-accessor'
export { SelectValueAccessor } from './generated/select-value-accessor'
export { TextValueAccessor } from './generated/text-value-accessor'
export { BalAutoFocus } from './focus.directive'

// SERVICES
export { BalToastService } from './overlays/toast.service'
export { BalSnackbarService } from './overlays/snackbar.service'
export { BalModalService } from './overlays/modal.service'
export { AngularDelegate } from './overlays/angular-delegate'

// PACKAGE MODULE
export { BalCoreModule } from './module'
export { BalSharedModule } from './shared'

// HELPERS
export { element, parseCustomEvent, ProxyComponent } from './helpers'

const bubu: BalProps.BalAccordionColor = 'primary'
const bub2: BalProps.BalBadgeColor = 'danger'
console.log(bubu)
console.log(bub2)
