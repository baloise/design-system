// Constants
export * from './constants/icons.constant'
export * from './constants/keys.constant'
export * from './constants/version.constant'
export * from './constants/tags.constant'

// Config
export * from './config'

// Initialize
export { initializeDesignSystem } from './initialize'
import { initializeDesignSystem } from './initialize'

export default function () {
  initializeDesignSystem()
}
