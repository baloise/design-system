import { BalConfigState } from '../config.types'

export interface BalConfigObserver {
  configChanged(state: BalConfigState): void
}
