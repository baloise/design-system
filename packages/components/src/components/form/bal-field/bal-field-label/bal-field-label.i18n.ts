import { I18n } from '../../../../types'

interface I18nFieldLabel {
  optional: string
}

export const i18nFieldLabel: I18n<I18nFieldLabel> = {
  de: {
    optional: ' (Optional)',
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
}
