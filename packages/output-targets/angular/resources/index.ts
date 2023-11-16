import { InjectionToken } from '@angular/core'

export const BalConfigToken = new InjectionToken<any>('USERCONFIG')

export const raf = (fn: () => void) => {
  fn()
}

export interface BaloiseDesignSystemAngularConfig {
  applyPolyfills?: boolean
  defaults?: any
  forms?: {
    setInvalid?: boolean
    invalidateOn?: 'touched' | 'dirty'
  }
}
