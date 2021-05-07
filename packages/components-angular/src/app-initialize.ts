import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'

export const appInitialize = () => {
  return (): any => {
    return applyPolyfills().then(() => {
      return defineCustomElements()
    })
  }
}
