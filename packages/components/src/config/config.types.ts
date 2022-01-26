export type BaloiseDesignSystemRegion = 'CH' | 'DE' | 'BE' | 'LU'
export type BaloiseDesignSystemLanguage = 'de' | 'fr' | 'it' | 'nl' | 'en'

export interface BaloiseDesignSystemUserConfig {
  applyPolyfills?: boolean
  region?: BaloiseDesignSystemRegion
  language?: BaloiseDesignSystemLanguage
}

export interface BaloiseDesignSystemDynamicConfig {
  region?: BaloiseDesignSystemRegion
  language?: BaloiseDesignSystemLanguage
}

export interface BaloiseDesignSystemBaseConfig {
  applyPolyfills: boolean
  region: BaloiseDesignSystemRegion
  language: BaloiseDesignSystemLanguage
}
