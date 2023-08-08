import { I18n } from '../../../interfaces'

export interface I18nDate {
  toggleDatepicker: string
  nextMonth: string
  previousMonth: string
  selectMonth: string
}

export const i18nDate: I18n<I18nDate> = {
  en: {
    toggleDatepicker: 'Open datepicker',
    nextMonth: 'Next month',
    previousMonth: 'Previous month',
    selectMonth: 'Select month and year',
  },
  fr: {
    toggleDatepicker: 'Ouvrir le sélecteur de dates',
    nextMonth: 'Mois suivant',
    previousMonth: 'Mois précédent',
    selectMonth: "Sélectionner le mois et l'année",
  },
  it: {
    toggleDatepicker: 'Apri il selettore della data',
    nextMonth: 'Mese successivo',
    previousMonth: 'Mese precedente',
    selectMonth: 'Seleziona mese e anno',
  },
  nl: {
    toggleDatepicker: 'Open datumkiezer',
    nextMonth: 'Volgende maand',
    previousMonth: 'Vorige maand',
    selectMonth: 'Selecteer maand en jaar',
  },
  es: {
    toggleDatepicker: 'Abrir selector de fechas',
    nextMonth: 'Mes siguiente',
    previousMonth: 'Mes anterior',
    selectMonth: 'Seleccionar mes y año',
  },
  pt: {
    toggleDatepicker: 'Abrir seletor de datas',
    nextMonth: 'Próximo mês',
    previousMonth: 'Mês anterior',
    selectMonth: 'Selecionar mês e ano',
  },
  sv: {
    toggleDatepicker: 'Öppna datumväljare',
    nextMonth: 'Nästa månad',
    previousMonth: 'Föregående månad',
    selectMonth: 'Välj månad och år',
  },
  fi: {
    toggleDatepicker: 'Avaa päivämäärän valitsin',
    nextMonth: 'Seuraava kuukausi',
    previousMonth: 'Edellinen kuukausi',
    selectMonth: 'Valitse kuukausi ja vuosi',
  },
  de: {
    toggleDatepicker: 'Öffne den Datumswähler',
    nextMonth: 'Nächster Monat',
    previousMonth: 'Vormonat',
    selectMonth: 'Monat und Jahr auswählen',
  },
  pl: {
    toggleDatepicker: 'Otwórz wybierak daty',
    nextMonth: 'Następny miesiąc',
    previousMonth: 'Poprzedni miesiąc',
    selectMonth: 'Wybierz miesiąc i rok',
  },
}
