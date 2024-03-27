import { I18n } from '../../interfaces'

interface I18nBalClearable {
  clearable: string
}

export const i18nBalClearable: I18n<I18nBalClearable> = {
  de: {
    clearable: 'Löschen',
  },
  en: {
    clearable: 'clear',
  },
  fr: {
    clearable: 'Effacer',
  },
  it: {
    clearable: 'Cancellare',
  },
  nl: {
    clearable: 'Wissen',
  },
  es: {
    clearable: 'Limpiar',
  },
  pl: {
    clearable: 'Wyczyść',
  },
  pt: {
    clearable: 'Limpar',
  },
  sv: {
    clearable: 'Rensa',
  },
  fi: {
    clearable: 'Tyhjennä',
  },
}
