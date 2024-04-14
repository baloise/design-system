import { I18n } from '../../interfaces'

interface I18nBalDropdown {
  clearable: string
  open: string
  close: string
}

export const i18nBalDropdown: I18n<I18nBalDropdown> = {
  de: {
    clearable: 'Löschen',
    open: 'Öffnen',
    close: 'Schließen',
  },
  en: {
    clearable: 'clear',
    open: 'Open',
    close: 'Close',
  },
  fr: {
    clearable: 'Effacer',
    open: 'Ouvrir',
    close: 'Fermer',
  },
  it: {
    clearable: 'Cancellare',
    open: 'Apri',
    close: 'Chiudi',
  },
  nl: {
    clearable: 'Wissen',
    open: 'Open',
    close: 'Sluiten',
  },
  es: {
    clearable: 'Limpiar',
    open: 'Abrir',
    close: 'Cerrar',
  },
  pl: {
    clearable: 'Wyczyść',
    open: 'Otwórz',
    close: 'Zamknij',
  },
  pt: {
    clearable: 'Limpar',
    open: 'Abrir',
    close: 'Fechar',
  },
  sv: {
    clearable: 'Rensa',
    open: 'Öppna',
    close: 'Stäng',
  },
  fi: {
    clearable: 'Tyhjennä',
    open: 'Avaa',
    close: 'Sulje',
  },
}
