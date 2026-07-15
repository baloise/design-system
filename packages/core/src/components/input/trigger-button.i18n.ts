import { I18n } from '../../interfaces'

interface I18nDsTriggerButton {
  openCalendar: string
  chooseDate: string
}

export const i18nDsTriggerButton: I18n<I18nDsTriggerButton> = {
  de: {
    openCalendar: 'Kalender öffnen',
    chooseDate: 'Datum auswählen',
  },
  en: {
    openCalendar: 'Open calendar',
    chooseDate: 'Choose date',
  },
  fr: {
    openCalendar: 'Ouvrir le calendrier',
    chooseDate: 'Choisir une date',
  },
  it: {
    openCalendar: 'Apri il calendario',
    chooseDate: 'Scegli una data',
  },
  nl: {
    openCalendar: 'Kalender openen',
    chooseDate: 'Datum kiezen',
  },
  es: {
    openCalendar: 'Abrir calendario',
    chooseDate: 'Elegir fecha',
  },
  pl: {
    openCalendar: 'Otwórz kalendarz',
    chooseDate: 'Wybierz datę',
  },
  pt: {
    openCalendar: 'Abrir calendário',
    chooseDate: 'Escolher data',
  },
  sv: {
    openCalendar: 'Öppna kalender',
    chooseDate: 'Välj datum',
  },
  fi: {
    openCalendar: 'Avaa kalenteri',
    chooseDate: 'Valitse päivämäärä',
  },
}
