import { baloiseDesignSystemConfig } from '../config'

export const localstring = (): string => {
  return `${baloiseDesignSystemConfig.language}-${baloiseDesignSystemConfig.region}`
}
