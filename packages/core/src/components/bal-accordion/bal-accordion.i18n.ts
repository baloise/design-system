import { I18n } from '../../interfaces'

interface I18nBalAccordion {
  open: string
  close: string
}

export const i18nBalAccordion: I18n<I18nBalAccordion> = {
  de: {
    open: 'Öffnen',
    close: 'Schließen',
  },
  en: {
    open: 'Open',
    close: 'Close',
  },
  fr: {
    open: 'Ouvrir',
    close: 'Fermer',
  },
  it: {
    open: 'Apri',
    close: 'Chiudi',
  },
  nl: {
    open: 'Open',
    close: 'Sluiten',
  },
  es: {
    open: 'Abrir',
    close: 'Cerrar',
  },
  pl: {
    open: 'Otwórz',
    close: 'Zamknij',
  },
  pt: {
    open: 'Abrir',
    close: 'Fechar',
  },
  sv: {
    open: 'Öppna',
    close: 'Stäng',
  },
  fi: {
    open: 'Avaa',
    close: 'Sulje',
  },
}
