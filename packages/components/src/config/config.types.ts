export type BalRegion = 'CH' | 'DE' | 'BE' | 'LU'

export type BalSwissLanguage = 'de' | 'fr' | 'it' | 'en'
export type BalLuxembourgLanguage = 'fr' | 'de' | 'en'
export type BalBelgiumLanguage = 'fr' | 'nl'
export type BalGermanLanguage = 'de'

export type BalLanguage = BalSwissLanguage | BalLuxembourgLanguage | BalBelgiumLanguage | BalGermanLanguage

export interface BalConfig {
  region?: BalRegion
  language?: BalLanguage
  allowedLanguages?: BalLanguage[]
}

export interface BalConfigState {
  region: BalRegion
  language: BalLanguage
  allowedLanguages: BalLanguage[]
}
