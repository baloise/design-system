import { I18n } from '../../../interfaces'

export interface I18nBalNavbarBrand {
  logoButtonLabel: string
}

export const i18nBalNavbarBrand: I18n<I18nBalNavbarBrand> = {
  en: {
    logoButtonLabel: 'To Homepage',
  },
  fr: {
    logoButtonLabel: 'Vers la page d’accueil',
  },
  it: {
    logoButtonLabel: 'Alla pagina principale',
  },
  nl: {
    logoButtonLabel: 'Naar de startpagina',
  },
  es: {
    logoButtonLabel: 'A la página principal',
  },
  pt: {
    logoButtonLabel: 'Para a página inicial',
  },
  sv: {
    logoButtonLabel: 'Till startsidan',
  },
  fi: {
    logoButtonLabel: 'Etusivulle',
  },
  de: {
    logoButtonLabel: 'Zur Startseite',
  },
  pl: {
    logoButtonLabel: 'Na stronę główną',
  },
}
