import { BaloiseDesignSystemConfig } from '../config'

export const localstring = (): string => {
  return `${BaloiseDesignSystemConfig.language}-${BaloiseDesignSystemConfig.region}`
}
