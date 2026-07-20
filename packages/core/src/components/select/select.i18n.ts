import { I18n } from '../../interfaces'

interface I18nDsSelect {
  searchPlaceholder: string
  noResults: string
}

export const i18nDsSelect: I18n<I18nDsSelect> = {
  de: {
    searchPlaceholder: 'Suchen…',
    noResults: 'Keine Ergebnisse',
  },
  en: {
    searchPlaceholder: 'Search…',
    noResults: 'No results',
  },
  fr: {
    searchPlaceholder: 'Rechercher…',
    noResults: 'Aucun résultat',
  },
  it: {
    searchPlaceholder: 'Cerca…',
    noResults: 'Nessun risultato',
  },
  nl: {
    searchPlaceholder: 'Zoeken…',
    noResults: 'Geen resultaten',
  },
  es: {
    searchPlaceholder: 'Buscar…',
    noResults: 'Sin resultados',
  },
  pl: {
    searchPlaceholder: 'Szukaj…',
    noResults: 'Brak wyników',
  },
  pt: {
    searchPlaceholder: 'Pesquisar…',
    noResults: 'Sem resultados',
  },
  sv: {
    searchPlaceholder: 'Sök…',
    noResults: 'Inga resultat',
  },
  fi: {
    searchPlaceholder: 'Hae…',
    noResults: 'Ei tuloksia',
  },
}
