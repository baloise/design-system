import { I18n } from '../../interfaces'

interface I18nDsNavbar {
  mainNavigation: string
  openMenu: string
  closeMenu: string
  navigationMenu: string
}

export const i18nDsNavbar: I18n<I18nDsNavbar> = {
  de: {
    mainNavigation: 'Hauptnavigation',
    openMenu: 'Navigationsmenu öffnen',
    closeMenu: 'Navigationsmenu schließen',
    navigationMenu: 'Navigationsmenü',
  },
  en: {
    mainNavigation: 'Main navigation',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    navigationMenu: 'Navigation menu',
  },
  fr: {
    mainNavigation: 'Navigation principale',
    openMenu: 'Ouvrir le menu de navigation',
    closeMenu: 'Fermer le menu de navigation',
    navigationMenu: 'Menu de navigation',
  },
  it: {
    mainNavigation: 'Navigazione principale',
    openMenu: 'Apri menu di navigazione',
    closeMenu: 'Chiudi menu di navigazione',
    navigationMenu: 'Menu di navigazione',
  },
  nl: {
    mainNavigation: 'Hoofdnavigatie',
    openMenu: 'Navigatiemenu openen',
    closeMenu: 'Navigatiemenu sluiten',
    navigationMenu: 'Navigatiemenu',
  },
  es: {
    mainNavigation: 'Navegación principal',
    openMenu: 'Abrir menú de navegación',
    closeMenu: 'Cerrar menú de navegación',
    navigationMenu: 'Menú de navegación',
  },
  pl: {
    mainNavigation: 'Nawigacja główna',
    openMenu: 'Otwórz menu nawigacji',
    closeMenu: 'Zamknij menu nawigacji',
    navigationMenu: 'Menu nawigacji',
  },
  pt: {
    mainNavigation: 'Navegação principal',
    openMenu: 'Abrir menu de navegação',
    closeMenu: 'Fechar menu de navegação',
    navigationMenu: 'Menu de navegação',
  },
  sv: {
    mainNavigation: 'Huvudnavigering',
    openMenu: 'Öppna navigationsmeny',
    closeMenu: 'Stäng navigationsmeny',
    navigationMenu: 'Navigationsmeny',
  },
  fi: {
    mainNavigation: 'Päänavigaatio',
    openMenu: 'Avaa navigointivalikko',
    closeMenu: 'Sulje navigointivalikko',
    navigationMenu: 'Navigointivalikko',
  },
}
