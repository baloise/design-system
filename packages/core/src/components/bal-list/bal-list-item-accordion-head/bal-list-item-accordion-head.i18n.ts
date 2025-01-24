import { I18n } from '../../../interfaces'

interface I18nBalListItemAccordionHead {
  open: string
  close: string
}

export const i18nBalListItemAccordionHead: I18n<I18nBalListItemAccordionHead> = {
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
