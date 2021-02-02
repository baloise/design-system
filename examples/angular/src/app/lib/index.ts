// DIRECTIVES
export * from './directives/proxies'

// FILTERS
export * from './filters'

// PACKAGE MODULE
export { BalUiLibraryModule } from './ui-library.module'

// HELPERS
export const parseCustomEvent = <T>(event: CustomEvent<T> | Event): T => {
  if ('detail' in event) {
    return event.detail
  }
  throw Error('Event was not a Custom Event or did not had a detail prop!')
}
