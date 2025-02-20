import { I18n } from '../../interfaces'

interface i18nNavBars {
  meta: string
  main: string
  open: string
  close: string
}

export const i18nNavBars: I18n<i18nNavBars> = {
  de: {
    meta: 'Hauptnavigation',
    main: 'Subnavigation',
    open: 'Menü öffnen',
    close: 'Menü schliessen',
  },
  en: {
    meta: 'Main Navigation',
    main: 'Sub Navigation',
    open: 'Open Menu',
    close: 'Close Menu',
  },
  fr: {
    meta: 'Navigation principale',
    main: 'Sous-navigation',
    open: 'Ouvrir le menu',
    close: 'Fermer le menu',
  },
  it: {
    meta: 'Navigazione principale',
    main: 'Sottomenu',
    open: 'Apri Menù',
    close: 'Chiudi menù',
  },
  nl: {
    meta: 'Hoofdnavigatie',
    main: 'Subnavigatie',
    open: 'Menu openen',
    close: 'Menu sluiten',
  },
  es: {
    meta: 'Navegación principal',
    main: 'Subnavegación',
    open: 'Menú abierto',
    close: 'Cerrar menú',
  },
  pl: {
    meta: 'Nawigacja główna',
    main: 'Nawigacja podrzędna',
    open: 'Otwórz menu',
    close: 'Zamknij menu',
  },
  pt: {
    meta: 'Navegação principal',
    main: 'Subnavegação',
    open: 'Menu aberto',
    close: 'Fechar menu',
  },
  sv: {
    meta: 'Huvudnavigering',
    main: 'Undernavigering',
    open: 'Öppna menyn',
    close: 'Stäng menyn',
  },
  fi: {
    meta: 'Päänavigointi',
    main: 'Alinavigointi',
    open: 'Avaa valikko',
    close: 'Sulje valikko',
  },
}
