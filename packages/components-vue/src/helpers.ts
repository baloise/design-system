import { Ref, unref } from 'vue'

/**
 * WebComponent Helpers
 */

interface WebComponent<T> {
  $el: T
}

export const element = <T>(elementReference: Ref<any> | any): T => {
  const component: WebComponent<T> = unref(elementReference)
  return component.$el
}
