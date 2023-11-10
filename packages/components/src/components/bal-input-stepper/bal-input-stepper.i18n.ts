import { I18n } from '../../interfaces'

interface I18nBalInputStepper {
  increase: string
  decrease: string
}

export const i18nBalInputStepper: I18n<I18nBalInputStepper> = {
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
