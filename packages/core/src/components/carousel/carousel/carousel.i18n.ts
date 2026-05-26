import { I18n } from '../../../interfaces'

interface I18nDsCarousel {
  scrollLeft: string
  scrollRight: string
  goToSlide: string
  slideOf: string
}

export const i18nDsCarousel: I18n<I18nDsCarousel> = {
  de: {
    scrollLeft: 'Vorheriges Element',
    scrollRight: 'Nächstes Element',
    goToSlide: 'Zu Folie',
    slideOf: 'von',
  },
  en: {
    scrollLeft: 'Previous item',
    scrollRight: 'Next item',
    goToSlide: 'Go to slide',
    slideOf: 'of',
  },
  fr: {
    scrollLeft: 'Élément précédent',
    scrollRight: 'Élément suivant',
    goToSlide: 'Aller à la diapositive',
    slideOf: 'sur',
  },
  it: {
    scrollLeft: 'Elemento precedente',
    scrollRight: 'Elemento successivo',
    goToSlide: 'Vai alla diapositiva',
    slideOf: 'di',
  },
  nl: {
    scrollLeft: 'Vorig item',
    scrollRight: 'Volgend item',
    goToSlide: 'Ga naar dia',
    slideOf: 'van',
  },
  es: {
    scrollLeft: 'Elemento anterior',
    scrollRight: 'Elemento siguiente',
    goToSlide: 'Ir a la diapositiva',
    slideOf: 'de',
  },
  pl: {
    scrollLeft: 'Poprzedni element',
    scrollRight: 'Następny element',
    goToSlide: 'Przejdź do slajdu',
    slideOf: 'z',
  },
  pt: {
    scrollLeft: 'Item anterior',
    scrollRight: 'Próximo item',
    goToSlide: 'Ir para o slide',
    slideOf: 'de',
  },
  sv: {
    scrollLeft: 'Föregående objekt',
    scrollRight: 'Nästa objekt',
    goToSlide: 'Gå till bild',
    slideOf: 'av',
  },
  fi: {
    scrollLeft: 'Edellinen kohde',
    scrollRight: 'Seuraava kohde',
    goToSlide: 'Siirry diaan',
    slideOf: 'kohteesta',
  },
}
