import { BalConfigState } from '../config.types'

export interface BalConfigObserver {
  configChanged(value: BalConfigState): void
}
