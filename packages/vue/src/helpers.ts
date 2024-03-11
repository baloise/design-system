import { Ref, unref } from 'vue'

/**
 * ProxyComponent Helpers
 */

export interface ProxyComponent<T> {
  $el: T
}

// eslint-disable-next-line
export const element = <T>(elementReference: Ref<any> | any): T => {
  const component: ProxyComponent<T> = unref(elementReference)
  return component.$el
}
