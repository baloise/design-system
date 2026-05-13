import { DsConfigState } from '../config.types'

export interface DsConfigObserver {
  configChanged(state: DsConfigState): void
}
