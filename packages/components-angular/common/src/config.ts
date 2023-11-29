import { BalConfig } from '@baloise/design-system-components'

export interface BaloiseDesignSystemAngularConfig {
  defaults?: BalConfig
  forms?: {
    setInvalid?: boolean
    invalidateOn?: 'touched' | 'dirty'
  }
}
