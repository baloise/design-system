import { Mixin } from './mixins'

export interface Andable<T> {
  and(chainers: string, method?: string, value?: string): T
}

export const AndableMixin: Mixin = ({ element, creator }) => ({
  and: function (chainers: string, method?: string, value?: string) {
    switch (arguments.length) {
      case 2:
        element.and(chainers, value)
        break
      case 3:
        element.and(chainers, method, value)
        break
      default:
        element.and(chainers)
        break
    }
    return creator()
  },
})
