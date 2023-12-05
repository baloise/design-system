import type { BalConfig } from '@baloise/design-system-components/components'

export interface BaloiseDesignSystemAngularConfig {
  defaults?: BalConfig
  forms?: {
    setInvalid?: boolean
    invalidateOn?: 'touched' | 'dirty'
  }
}
