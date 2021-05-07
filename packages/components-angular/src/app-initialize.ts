import { defineCustomElements, applyPolyfills } from '@baloise/design-system-components/loader'

export const appInitialize = () => {
  return (): any => {
    return applyPolyfills().then(() => {
      return defineCustomElements()
    })
  }
}
