import { I18n } from '../../../interfaces'

export interface I18nDate {
  nextMonth: string
  previousMonth: string
  selectMonth: string
}

export const i18nDate: I18n<I18nDate> = {
  de: {
    nextMonth: 'nächsten Monat',
    previousMonth: 'Vormonat',
    selectMonth: 'Monat und Jahr auswählen',
  },
  en: {
    nextMonth: 'next month',
    previousMonth: 'previous month',
    selectMonth: 'select month and year',
  },
  fr: {
    nextMonth: 'mois prochain',
    previousMonth: 'mois précédent',
    selectMonth: "sélectionner le mois et l'année",
  },
  it: {
    nextMonth: 'prossimo mese',
    previousMonth: 'mese scorso',
    selectMonth: "seleziona il mese e l'anno",
  },
  nl: {
    nextMonth: 'volgende maand',
    previousMonth: 'vorige maand',
    selectMonth: 'selecteer maand en jaar',
  },
  es: {
    nextMonth: 'próximo mes',
    previousMonth: 'mes anterior',
    selectMonth: 'seleccionar mes y año',
  },
  pl: {
    nextMonth: 'przyszłym miesiącu',
    previousMonth: 'poprzedni miesiąc',
    selectMonth: 'wybierz miesiąc i rok',
  },
  pt: {
    nextMonth: 'próximo mês',
    previousMonth: 'mês anterior',
    selectMonth: 'selecionar mês e ano',
  },
  sv: {
    nextMonth: 'nästa månad',
    previousMonth: 'förra månaden',
    selectMonth: 'välj månad och år',
  },
  fi: {
    nextMonth: 'ensi kuussa',
    previousMonth: 'edellinen kuukausi',
    selectMonth: 'valitse kuukausi ja vuosi',
  },
}
