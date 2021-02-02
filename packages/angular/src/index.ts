// DIRECTIVES
export * from './directives/proxies'

// FILTERS
export * from './filters'

// NG-MODEL ACCESSORS
export * from './directives/boolean-value-accessor'
export * from './directives/text-value-accessor'
export * from './directives/select-value-accessor'

// PACKAGE MODULE
export { BalUiLibraryModule } from './ui-library.module'

// HELPERS
export const parseCustomEvent = <T>(event: CustomEvent<T> | Event): T => {
  if ('detail' in event) {
    return event.detail
  }
  return null
}
