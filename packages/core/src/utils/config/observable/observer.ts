import { ConfigState } from '../config.types'

export interface BalConfigObserver {
  configChanged(state: BalConfigState): void
}
