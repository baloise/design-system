// Constants
export * from './constants/icons.constant'
export * from './constants/keys.constant'
export * from './constants/version.constant'
export * from './constants/tags.constant'

// Config
export * from './config'

import { initializeDesignSystem } from './initialize'

export default function () {
  initializeDesignSystem()
}
