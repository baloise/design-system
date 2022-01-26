import { BaloiseDesignSystemConfig } from '../config'

export interface ConfigObserver {
  configChanged(value: BaloiseDesignSystemConfig): void
}
