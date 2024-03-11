import { I18n } from '../../interfaces'

interface i18nNavBars {
  open: string
  close: string
}

export const i18nNavBars: I18n<i18nNavBars> = {
  de: {
    open: 'Menü öffnen',
    close: 'Menü schliessen',
  },
  en: {
    open: 'Open Menu',
    close: 'Close Menu',
  },
  fr: {
    open: 'Ouvrir le menu',
    close: 'Fermer le menu',
  },
  it: {
    open: 'Apri Menù',
    close: 'Chiudi menù',
  },
  nl: {
    open: 'Menu openen',
    close: 'Menu sluiten',
  },
  es: {
    open: 'Menú abierto',
    close: 'Cerrar menú',
  },
  pl: {
    open: 'Otwórz menu',
    close: 'Zamknij menu',
  },
  pt: {
    open: 'Menu aberto',
    close: 'Fechar menu',
  },
  sv: {
    open: 'Öppna menyn',
    close: 'Stäng menyn',
  },
  fi: {
    open: 'Avaa valikko',
    close: 'Sulje valikko',
  },
}
