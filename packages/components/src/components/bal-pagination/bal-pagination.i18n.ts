import { I18n } from '../../interfaces'

interface I18nPaginationContolLabel {
  left: string
  right: string
}

export const i18nControlLabel: I18n<I18nPaginationContolLabel> = {
  de: {
    left: 'Vorherige Seite',
    right: 'Nächste Seite',
  },
  en: {
    left: 'Previous Page',
    right: 'Next Page',
  },
  fr: {
    left: 'Page précédente',
    right: 'Page suivante',
  },
  it: {
    left: 'Pagina precedente',
    right: 'Pagina successiva',
  },
  nl: {
    left: 'Vorige pagina',
    right: 'Volgende pagina',
  },
  es: {
    left: 'Página anterior',
    right: 'Página siguiente',
  },
  pl: {
    left: 'Poprzednia strona',
    right: 'Następna strona',
  },
  pt: {
    left: 'Página anterior',
    right: 'Próxima página',
  },
  sv: {
    left: 'Föregående sida',
    right: 'Nästa sida',
  },
  fi: {
    left: 'Edellinen sivu',
    right: 'Seuraava sivu',
  },
}
