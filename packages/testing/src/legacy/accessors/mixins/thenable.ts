/// <reference types="cypress" />

import { Mixin } from './mixins'

export interface Thenable<T> {
  then(callBack: (params: any) => void): T
}

export const ThenableMixin: Mixin = ({ element, creator }) => ({
  then: (callBack: (params: any) => void) => {
    element.then((param?) => callBack(param))
    return creator()
  },
})
