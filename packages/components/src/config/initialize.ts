import { BalConfig } from './config.types'
import { balConfigStore } from './config.store'

export const initialize = (defaultConfig: BalConfig = {}) => {
  balConfigStore.reset(defaultConfig)
}
