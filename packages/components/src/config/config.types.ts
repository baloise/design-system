export type BalRegion = 'CH' | 'DE' | 'BE' | 'LU'

export type BalSwissLanguage = 'de' | 'fr' | 'it' | 'en'
export type BalLuxembourgLanguage = 'fr' | 'de' | 'en'
export type BalBelgiumLanguage = 'fr' | 'nl'
export type BalGermanLanguage = 'de'

export type BalLanguage = BalSwissLanguage | BalLuxembourgLanguage | BalBelgiumLanguage | BalGermanLanguage

export type BalIcons = { [key: string]: string }

export interface BalConfig {
  region?: BalRegion
  language?: BalLanguage
  allowedLanguages?: BalLanguage[]
  icons?: BalIcons
}

export interface BalConfigState {
  region: BalRegion
  language: BalLanguage
  allowedLanguages: BalLanguage[]
  icons: BalIcons
}
