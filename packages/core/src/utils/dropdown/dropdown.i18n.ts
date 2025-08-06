import { I18n } from '../../interfaces'

interface I18nBalDropdown {
  clearable: string
  open: string
  close: string
  noOptions: string
}

export const i18nBalDropdown: I18n<I18nBalDropdown> = {
  de: {
    clearable: 'Löschen',
    open: 'Öffnen',
    close: 'Schließen',
    noOptions: 'Kein Treffer gefunden.',
  },
  en: {
    clearable: 'clear',
    open: 'Open',
    close: 'Close',
    noOptions: 'No matches found.',
  },
  fr: {
    clearable: 'Effacer',
    open: 'Ouvrir',
    close: 'Fermer',
    noOptions: 'Aucun résultat trouvé.',
  },
  it: {
    clearable: 'Cancellare',
    open: 'Apri',
    close: 'Chiudi',
    noOptions: 'Nessun risultato trovato.',
  },
  nl: {
    clearable: 'Wissen',
    open: 'Open',
    close: 'Sluiten',
    noOptions: 'Geen resultaat gevonden.',
  },
  es: {
    clearable: 'Limpiar',
    open: 'Abrir',
    close: 'Cerrar',
    noOptions: 'No se han encontrado resultados.',
  },
  pl: {
    clearable: 'Wyczyść',
    open: 'Otwórz',
    close: 'Zamknij',
    noOptions: 'Nie znaleziono wyników.',
  },
  pt: {
    clearable: 'Limpar',
    open: 'Abrir',
    close: 'Fechar',
    noOptions: 'Nenhum resultado encontrado.',
  },
  sv: {
    clearable: 'Rensa',
    open: 'Öppna',
    close: 'Stäng',
    noOptions: 'Inga träffar hittades.',
  },
  fi: {
    clearable: 'Tyhjennä',
    open: 'Avaa',
    close: 'Sulje',
    noOptions: 'Tuloksia ei löytynyt.',
  },
}
