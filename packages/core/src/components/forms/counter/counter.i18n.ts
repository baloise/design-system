import { I18n } from '../../../interfaces'

export interface I18nDsCounter {
  increase: string
  decrease: string
}

export const i18nDsCounter: I18n<I18nDsCounter> = {
  de: {
    increase: 'erhöhen',
    decrease: 'verringern',
  },
  en: {
    increase: 'increase',
    decrease: 'decrease',
  },
  fr: {
    increase: 'augmenter',
    decrease: 'diminuer',
  },
  it: {
    increase: 'aumentare',
    decrease: 'diminuire',
  },
  nl: {
    increase: 'verhogen',
    decrease: 'verlagen',
  },
  es: {
    increase: 'aumentar',
    decrease: 'disminuir',
  },
  pl: {
    increase: 'zwiększ',
    decrease: 'zmniejsz',
  },
  pt: {
    increase: 'aumentar',
    decrease: 'diminuir',
  },
  sv: {
    increase: 'öka',
    decrease: 'minska',
  },
  fi: {
    increase: 'kasvata',
    decrease: 'vähennä',
  },
}
