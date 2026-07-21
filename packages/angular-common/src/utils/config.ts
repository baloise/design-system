import type { BalConfig } from '@baloise/ds-core'

export interface BaloiseDesignSystemAngularConfig {
  defaults?: BalConfig
  forms?: {
    setInvalid?: boolean
    invalidateOn?: 'touched' | 'dirty'
  }
}
