import { BaloiseDesignSystemConfig } from '../config.types'

export interface ConfigObserver {
  configChanged(value: BaloiseDesignSystemConfig): void
}
