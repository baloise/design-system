import { I18n } from '../../interfaces'

interface I18nBalOptionList {
  noOptions: string
}

export const I18nBalOptionList: I18n<I18nBalOptionList> = {
  de: {
    noOptions: 'Kein Treffer gefunden.',
  },
  en: {
    noOptions: 'No matches found.',
  },
  fr: {
    noOptions: 'Aucun résultat trouvé.',
  },
  it: {
    noOptions: 'Nessun risultato trovato.',
  },
  nl: {
    noOptions: 'Geen resultaat gevonden.',
  },
  es: {
    noOptions: 'No se han encontrado resultados.',
  },
  pl: {
    noOptions: 'Nie znaleziono wyników.',
  },
  pt: {
    noOptions: 'Nenhum resultado encontrado.',
  },
  sv: {
    noOptions: 'Inga träffar hittades.',
  },
  fi: {
    noOptions: 'Tuloksia ei löytynyt.',
  },
}
