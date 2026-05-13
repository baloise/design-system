import { InjectionToken } from '@angular/core'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DsTokenUserConfig = new InjectionToken<any>('DsTokenUserConfig')

export interface DesignSystemAngularConfig {
  defaults?: unknown
  forms?: {
    setInvalid?: boolean
    invalidateOn?: 'touched' | 'dirty'
  }
}

export const raf = (fn: () => void) => fn()
