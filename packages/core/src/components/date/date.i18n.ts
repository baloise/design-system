import { I18n } from '../../interfaces'

interface I18nDsDate {
  switchToYearView: string
  previousMonth: string
  nextMonth: string
  previousYear: string
  nextYear: string
  previousDecade: string
  nextDecade: string
}

export const i18nDsDate: I18n<I18nDsDate> = {
  de: {
    switchToYearView: 'Zur Jahresansicht wechseln',
    previousMonth: 'Vorheriger Monat',
    nextMonth: 'Nächster Monat',
    previousYear: 'Vorheriges Jahr',
    nextYear: 'Nächstes Jahr',
    previousDecade: 'Vorherige Dekade',
    nextDecade: 'Nächste Dekade',
  },
  en: {
    switchToYearView: 'Switch to year view',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    previousYear: 'Previous year',
    nextYear: 'Next year',
    previousDecade: 'Previous decade',
    nextDecade: 'Next decade',
  },
  fr: {
    switchToYearView: 'Passer à la vue annuelle',
    previousMonth: 'Mois précédent',
    nextMonth: 'Mois suivant',
    previousYear: 'Année précédente',
    nextYear: 'Année suivante',
    previousDecade: 'Décennie précédente',
    nextDecade: 'Décennie suivante',
  },
  it: {
    switchToYearView: 'Passa alla vista annuale',
    previousMonth: 'Mese precedente',
    nextMonth: 'Mese successivo',
    previousYear: 'Anno precedente',
    nextYear: 'Anno successivo',
    previousDecade: 'Decennio precedente',
    nextDecade: 'Decennio successivo',
  },
  nl: {
    switchToYearView: 'Overschakelen naar jaarweergave',
    previousMonth: 'Vorige maand',
    nextMonth: 'Volgende maand',
    previousYear: 'Vorig jaar',
    nextYear: 'Volgend jaar',
    previousDecade: 'Vorig decennium',
    nextDecade: 'Volgend decennium',
  },
  es: {
    switchToYearView: 'Cambiar a vista anual',
    previousMonth: 'Mes anterior',
    nextMonth: 'Mes siguiente',
    previousYear: 'Año anterior',
    nextYear: 'Año siguiente',
    previousDecade: 'Década anterior',
    nextDecade: 'Década siguiente',
  },
  pl: {
    switchToYearView: 'Przełącz na widok roczny',
    previousMonth: 'Poprzedni miesiąc',
    nextMonth: 'Następny miesiąc',
    previousYear: 'Poprzedni rok',
    nextYear: 'Następny rok',
    previousDecade: 'Poprzednia dekada',
    nextDecade: 'Następna dekada',
  },
  pt: {
    switchToYearView: 'Mudar para a vista anual',
    previousMonth: 'Mês anterior',
    nextMonth: 'Mês seguinte',
    previousYear: 'Ano anterior',
    nextYear: 'Ano seguinte',
    previousDecade: 'Década anterior',
    nextDecade: 'Década seguinte',
  },
  sv: {
    switchToYearView: 'Byt till årsvy',
    previousMonth: 'Föregående månad',
    nextMonth: 'Nästa månad',
    previousYear: 'Föregående år',
    nextYear: 'Nästa år',
    previousDecade: 'Föregående decennium',
    nextDecade: 'Nästa decennium',
  },
  fi: {
    switchToYearView: 'Vaihda vuosinäkymään',
    previousMonth: 'Edellinen kuukausi',
    nextMonth: 'Seuraava kuukausi',
    previousYear: 'Edellinen vuosi',
    nextYear: 'Seuraava vuosi',
    previousDecade: 'Edellinen vuosikymmen',
    nextDecade: 'Seuraava vuosikymmen',
  },
}
