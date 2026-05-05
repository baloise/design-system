import { I18n } from '../../interfaces'

interface I18nPaginationContolLabel {
  label: string
  left: string
  right: string
}

export const i18nControlLabel: I18n<I18nPaginationContolLabel> = {
  de: {
    label: 'Seitennavigation',
    left: 'Vorherige Seite',
    right: 'Nächste Seite',
  },
  en: {
    label: 'Page Navigation',
    left: 'Previous Page',
    right: 'Next Page',
  },
  fr: {
    label: 'Navigation des pages',
    left: 'Page précédente',
    right: 'Page suivante',
  },
  it: {
    label: 'Navigazione pagina',
    left: 'Pagina precedente',
    right: 'Pagina successiva',
  },
  nl: {
    label: 'Paginanavigatie',
    left: 'Vorige pagina',
    right: 'Volgende pagina',
  },
  es: {
    label: 'Navegación de páginas',
    left: 'Página anterior',
    right: 'Página siguiente',
  },
  pl: {
    label: 'Nawigacja stron',
    left: 'Poprzednia strona',
    right: 'Następna strona',
  },
  pt: {
    label: 'Navegação de página',
    left: 'Página anterior',
    right: 'Próxima página',
  },
  sv: {
    label: 'Sidnavigering',
    left: 'Föregående sida',
    right: 'Nästa sida',
  },
  fi: {
    label: 'Sivujen navigointi',
    left: 'Edellinen sivu',
    right: 'Seuraava sivu',
  },
}
