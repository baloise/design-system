import { I18n } from '../../../interfaces'

interface I18nDsTabs {
  scrollLeft: string
  scrollRight: string
}

export const i18nDsTabs: I18n<I18nDsTabs> = {
  de: {
    scrollLeft: 'Tabs nach links scrollen',
    scrollRight: 'Tabs nach rechts scrollen',
  },
  en: {
    scrollLeft: 'Scroll tabs left',
    scrollRight: 'Scroll tabs right',
  },
  fr: {
    scrollLeft: 'Faire défiler les onglets vers la gauche',
    scrollRight: 'Faire défiler les onglets vers la droite',
  },
  it: {
    scrollLeft: 'Scorri le schede a sinistra',
    scrollRight: 'Scorri le schede a destra',
  },
  nl: {
    scrollLeft: 'Tabbladen naar links scrollen',
    scrollRight: 'Tabbladen naar rechts scrollen',
  },
  es: {
    scrollLeft: 'Desplazar pestañas a la izquierda',
    scrollRight: 'Desplazar pestañas a la derecha',
  },
  pl: {
    scrollLeft: 'Przewiń karty w lewo',
    scrollRight: 'Przewiń karty w prawo',
  },
  pt: {
    scrollLeft: 'Rolar abas para a esquerda',
    scrollRight: 'Rolar abas para a direita',
  },
  sv: {
    scrollLeft: 'Scrolla flikar åt vänster',
    scrollRight: 'Scrolla flikar åt höger',
  },
  fi: {
    scrollLeft: 'Vieritä välilehtiä vasemmalle',
    scrollRight: 'Vieritä välilehtiä oikealle',
  },
}
