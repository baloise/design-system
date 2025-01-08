import { I18n } from '../../interfaces'

interface I18nSwiperControlLabel {
  left: string
  right: string
}

export const i18nSwiperControlLabel: I18n<I18nSwiperControlLabel> = {
  de: {
    left: 'vorherige',
    right: 'nächste',
  },
  en: {
    left: 'previous',
    right: 'next',
  },
  fr: {
    left: 'précédent',
    right: 'suivant',
  },
  it: {
    left: 'precedente',
    right: 'successivo',
  },
  nl: {
    left: 'vorige',
    right: 'volgende',
  },
  es: {
    left: 'anterior',
    right: 'siguiente',
  },
  pl: {
    left: 'poprzedni',
    right: 'następny',
  },
  pt: {
    left: 'anterior',
    right: 'próximo',
  },
  sv: {
    left: 'föregående',
    right: 'nästa',
  },
  fi: {
    left: 'edellinen',
    right: 'seuraava',
  },
}
