import { I18n } from '../../interfaces'

interface I18nBalLabel {
  optional: string
}

export const i18nBalLabel: I18n<I18nBalLabel> = {
  de: {
    optional: ' (optional)',
  },
  en: {
    optional: ' (optional)',
  },
  fr: {
    optional: ' (optionnel)',
  },
  it: {
    optional: ' (opzionale)',
  },
  nl: {
    optional: ' (optioneel)',
  },
  es: {
    optional: ' (opcional)',
  },
  pl: {
    optional: ' (opcjonalnie)',
  },
  pt: {
    optional: ' (opcional)',
  },
  sv: {
    optional: ' (frivillig)',
  },
  fi: {
    optional: ' (valinnainen)',
  },
}
