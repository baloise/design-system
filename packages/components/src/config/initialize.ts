import { BaloiseDesignSystemDynamicConfig } from './config.types'
import { configStore } from './config.store'

export const initialize = (userConfig: BaloiseDesignSystemDynamicConfig = {}) => {
  configStore.reset(userConfig)
}
