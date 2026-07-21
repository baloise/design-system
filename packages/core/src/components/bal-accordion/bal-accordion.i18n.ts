import { I18n } from '../../interfaces'

interface I18nBalAccordion {
  open: string
  close: string
}

export const i18nBalAccordion: I18n<I18nBalAccordion> = {
  de: {
    open: 'Mehr anzeigen',
    close: 'Weniger anzeigen',
  },
  en: {
    open: 'Show more',
    close: 'Show less',
  },
  fr: {
    open: 'Afficher plus',
    close: 'Afficher moins',
  },
  it: {
    open: 'Mostra di più',
    close: 'Mostra di meno',
  },
  nl: {
    open: 'Meer weergeven',
    close: 'Minder weergeven',
  },
  es: {
    open: 'Mostrar más',
    close: 'Mostrar menos',
  },
  pl: {
    open: 'Pokaż więcej',
    close: 'Pokaż mniej',
  },
  pt: {
    open: 'Mostrar mais',
    close: 'Mostrar menos',
  },
  sv: {
    open: 'Visa mer',
    close: 'Visa mindre',
  },
  fi: {
    open: 'Näytä lisää',
    close: 'Näytä vähemmän',
  },
}
