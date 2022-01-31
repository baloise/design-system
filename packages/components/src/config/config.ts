import { balConfigStore } from './config.store'
import { BalLanguage, BalRegion } from './config.types'

class BaloiseDesignSystemConfigClass {
  get region(): BalRegion {
    return balConfigStore.state.region
  }

  set region(region: BalRegion) {
    if (region !== balConfigStore.state.region) {
      balConfigStore.patch({ region })
    }
  }

  get language(): BalLanguage {
    return balConfigStore.state.language
  }

  set language(language: BalLanguage) {
    if (language !== balConfigStore.state.language) {
      balConfigStore.patch({ language })
    }
  }

  toString() {
    return balConfigStore.toString()
  }
}

export const BaloiseDesignSystemConfig = new BaloiseDesignSystemConfigClass()

export const useBalConfig = (): BaloiseDesignSystemConfigClass => BaloiseDesignSystemConfig

export const updateBalLanguge = (language: BalLanguage): void => {
  BaloiseDesignSystemConfig.language = language
}

export const updateBalRegion = (region: BalRegion): void => {
  BaloiseDesignSystemConfig.region = region
}
