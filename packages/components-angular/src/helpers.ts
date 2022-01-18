export const parseCustomEvent = <T>(event: CustomEvent<T> | Event): T => {
  if ('detail' in event) {
    return event.detail
  }
  throw Error('Event was not a Custom Event or did not had a detail prop!')
}

export interface ProxyComponent<T> {
  el: T
}

// eslint-disable-next-line
export const element = <T>(elementReference: any): T => {
  const component: ProxyComponent<T> = elementReference
  return component.el
}
