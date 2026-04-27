import { InjectionToken } from '@angular/core'

export const DsTokenUserConfig = new InjectionToken<any>('DsTokenUserConfig')

export interface DesignSystemAngularConfig {
  defaults?: unknown
  forms?: {
    setInvalid?: boolean
    invalidateOn?: 'touched' | 'dirty'
  }
}

export const raf = (fn: () => void) => fn()
