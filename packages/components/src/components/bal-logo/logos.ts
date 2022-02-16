import { BaloiseGroupLogo } from './logos/baloise-group.logo'
import { BaloiseSobaLogo } from './logos/baloise-soba.logo'
import {
  BaloiseInsuranceDeLogo,
  BaloiseInsuranceEnLogo,
  BaloiseInsuranceFrLogo,
  BaloiseInsuranceItLogo,
} from './logos/baloise-insurance.logo'

export interface Logos {
  group: LogoSet
  insurance: LogoSet
  soba: LogoSet
}

export interface LogoSet {
  en: string
  de: string
  fr: string
  it: string
  nl: string
}

export const logos: Logos = {
  group: {
    en: BaloiseGroupLogo,
    de: BaloiseGroupLogo,
    fr: BaloiseGroupLogo,
    it: BaloiseGroupLogo,
    nl: BaloiseGroupLogo,
  },
  insurance: {
    en: BaloiseInsuranceEnLogo,
    de: BaloiseInsuranceDeLogo,
    fr: BaloiseInsuranceFrLogo,
    it: BaloiseInsuranceItLogo,
    nl: BaloiseInsuranceEnLogo,
  },
  soba: {
    en: BaloiseSobaLogo,
    de: BaloiseSobaLogo,
    fr: BaloiseSobaLogo,
    it: BaloiseSobaLogo,
    nl: BaloiseSobaLogo,
  },
}
