import { configStore } from './config.container'
import { BaloiseDesignSystemLanguage, BaloiseDesignSystemRegion } from './config.types'

export class BaloiseDesignSystemConfig {
  get region(): BaloiseDesignSystemRegion {
    return configStore.state.region
  }

  set region(region: BaloiseDesignSystemRegion) {
    configStore.patch({ region })
  }

  get language(): BaloiseDesignSystemLanguage {
    return configStore.state.language
  }

  set language(language: BaloiseDesignSystemLanguage) {
    configStore.patch({ language })
  }

  toString() {
    return configStore.toString()
  }
}

export const baloiseDesignSystemConfig = new BaloiseDesignSystemConfig()
