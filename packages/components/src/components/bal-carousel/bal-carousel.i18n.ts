import { I18n } from '../../interfaces'

interface I18nCarouselLabel {
  left: string
  right: string
}

export const i18nControlLabel: I18n<I18nCarouselLabel> = {
  de: {
    left: 'Linke Steuerung',
    right: 'R echte Steuerung',
  },
  en: {
    left: 'Left Control',
    right: 'Right Contol',
  },
  fr: {
    left: 'Contrôle gauche',
    right: 'Contrôle droit',
  },
  it: {
    left: 'Controllo sinistro',
    right: 'Controllo destro',
  },
  nl: {
    left: 'Linkerbesturing',
    right: 'Rechterbesturing',
  },
  es: {
    left: 'Control izquierdo',
    right: 'Control derecho',
  },
  pl: {
    left: 'Lewy klawisz Ctrl',
    right: 'Prawy klawisz Ctrl',
  },
  pt: {
    left: 'Controlo esquerdo',
    right: 'Controlo direito',
  },
  sv: {
    left: 'Vänsterkontroll',
    right: 'Högerkontroll',
  },
  fi: {
    left: 'Vasen Control',
    right: 'Oikea Control',
  },
}
