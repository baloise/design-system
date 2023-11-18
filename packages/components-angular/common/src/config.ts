import { BalConfig } from '@baloise/design-system-components'

export interface BaloiseDesignSystemAngularConfig {
  applyPolyfills?: boolean
  defaults?: BalConfig
  forms?: {
    setInvalid?: boolean
    invalidateOn?: 'touched' | 'dirty'
  }
}
