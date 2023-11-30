import { InjectionToken } from '@angular/core'

export const BalTokenUserConfig = new InjectionToken<any>('BalTokenUserConfig')

export interface BaloiseDesignSystemAngularConfig {
  defaults?: any
  forms?: {
    setInvalid?: boolean
    invalidateOn?: 'touched' | 'dirty'
  }
}

export const raf = (fn: () => void) => fn()
