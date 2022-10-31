export type BalRegion = 'CH' | 'DE' | 'BE' | 'LU'

export type BalSwissLanguage = 'de' | 'fr' | 'it' | 'en'
export type BalLuxembourgLanguage = 'fr' | 'de' | 'en'
export type BalLuxembourgInternationalLanguage = BalLuxembourgLanguage | 'es' | 'pl' | 'pt' | 'sv' | 'fi'
export type BalBelgiumLanguage = 'fr' | 'nl'
export type BalGermanLanguage = 'de'

export type BalLanguage =
  | BalSwissLanguage
  | BalLuxembourgLanguage
  | BalLuxembourgInternationalLanguage
  | BalBelgiumLanguage
  | BalGermanLanguage

export interface BalConfig {
  region?: BalRegion
  language?: BalLanguage
  allowedLanguages?: BalLanguage[]
}

export interface BalConfigState {
  region: BalRegion
  language: BalLanguage
  allowedLanguages: BalLanguage[]
  fallbackLanguage: BalLanguage
}

export type BalMode = 'css' | 'sass' | 'all'
