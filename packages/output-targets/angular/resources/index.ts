import { InjectionToken } from '@angular/core'

export const BalConfigToken = new InjectionToken<any>('USERCONFIG')

export interface BaloiseDesignSystemAngularConfig {
  applyPolyfills?: boolean
  defaults?: any
  forms?: {
    setInvalid: boolean
  }
}
