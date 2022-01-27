export type BaloiseDesignSystemRegion = 'CH' | 'DE' | 'BE' | 'LU'
export type BaloiseDesignSystemLanguage = 'de' | 'fr' | 'it' | 'nl' | 'en'

export interface BaloiseDesignSystemDynamicConfig {
  region?: BaloiseDesignSystemRegion
  language?: BaloiseDesignSystemLanguage
}

export interface BaloiseDesignSystemConfig {
  region: BaloiseDesignSystemRegion
  language: BaloiseDesignSystemLanguage
}
