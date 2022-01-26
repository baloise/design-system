import { BaloiseDesignSystemUserConfig } from './config.types'
import { configStore } from './config.container'

export const initialize = (userConfig: BaloiseDesignSystemUserConfig = {}) => {
  configStore.reset(userConfig)
}
