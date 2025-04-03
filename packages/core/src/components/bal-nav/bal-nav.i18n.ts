import { I18n } from '../../interfaces'

interface i18nNavBars {
  mainNavigation: string
  navigation: string
  subNavigation: string
  open: string
  close: string
}

export const i18nNavBars: I18n<i18nNavBars> = {
  de: {
    mainNavigation: 'Hauptnavigation',
    navigation: 'Navigation',
    subNavigation: 'Subnavigation',
    open: 'Menü öffnen',
    close: 'Menü schliessen',
  },
  en: {
    mainNavigation: 'Main navigation',
    navigation: 'Navigation',
    subNavigation: 'Sub navigation',
    open: 'Open Menu',
    close: 'Close Menu',
  },
  fr: {
    mainNavigation: 'Navigation principale',
    navigation: 'Navigation',
    subNavigation: 'Sous-navigation',
    open: 'Ouvrir le menu',
    close: 'Fermer le menu',
  },
  it: {
    mainNavigation: 'Navigazione principale',
    navigation: 'Navigazione',
    subNavigation: 'Sottonavigazione',
    open: 'Apri Menù',
    close: 'Chiudi menù',
  },
  nl: {
    mainNavigation: 'Hoofdnavigatie',
    navigation: 'Navigatie',
    subNavigation: 'Subnavigatie',
    open: 'Menu openen',
    close: 'Menu sluiten',
  },
  es: {
    mainNavigation: 'Navegación principal',
    navigation: 'Navegación',
    subNavigation: 'Subnavegación',
    open: 'Menú abierto',
    close: 'Cerrar menú',
  },
  pl: {
    mainNavigation: 'Nawigacja główna',
    navigation: 'Nawigacja',
    subNavigation: 'Nawigacja podrzędna',
    open: 'Otwórz menu',
    close: 'Zamknij menu',
  },
  pt: {
    mainNavigation: 'Navegação principal',
    navigation: 'Navegação',
    subNavigation: 'Subnavegação',
    open: 'Menu aberto',
    close: 'Fechar menu',
  },
  sv: {
    mainNavigation: 'Huvudnavigering',
    navigation: 'Navigering',
    subNavigation: 'Undernavigering',
    open: 'Öppna menyn',
    close: 'Stäng menyn',
  },
  fi: {
    mainNavigation: 'Päänavigaatio',
    navigation: 'Navigaatio',
    subNavigation: 'Alinavigaatio',
    open: 'Avaa valikko',
    close: 'Sulje valikko',
  },
}
