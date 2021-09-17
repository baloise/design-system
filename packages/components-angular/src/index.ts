// DIRECTIVES
export * from './directives/proxies'

// FILTERS
export * from './filters'

// VALIDATORS
export * as BalValidators from './validators'

// SERVICES
export { BalToastService } from './bal-toast.service'
export { BalSnackbarService } from './bal-snackbar.service'
export { BalModalController as BalModalService } from './overlays/modal.service'
export { AngularDelegate } from './overlays/angular-delegate'

// PACKAGE MODULE
export { BaloiseDesignSystemModule } from './module'

// HELPERS
export const parseCustomEvent = <T>(event: CustomEvent<T> | Event): T => {
  if ('detail' in event) {
    return event.detail
  }
  throw Error('Event was not a Custom Event or did not had a detail prop!')
}
