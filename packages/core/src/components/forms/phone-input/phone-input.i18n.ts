import { I18n } from '../../../interfaces'

interface I18nDsPhoneInput {
  country: string
  selectCountry: string
  filterCountries: string
  noResults: string
}

export const i18nDsPhoneInput: I18n<I18nDsPhoneInput> = {
  de: {
    country: 'Land',
    selectCountry: 'Land auswählen',
    filterCountries: 'Länder filtern',
    noResults: 'Keine Ergebnisse',
  },
  en: {
    country: 'Country',
    selectCountry: 'Select country',
    filterCountries: 'Filter countries',
    noResults: 'No results',
  },
  fr: {
    country: 'Pays',
    selectCountry: 'Sélectionner un pays',
    filterCountries: 'Filtrer les pays',
    noResults: 'Aucun résultat',
  },
  it: {
    country: 'Paese',
    selectCountry: 'Seleziona un paese',
    filterCountries: 'Filtra i paesi',
    noResults: 'Nessun risultato',
  },
  nl: {
    country: 'Land',
    selectCountry: 'Selecteer een land',
    filterCountries: 'Landen filteren',
    noResults: 'Geen resultaten',
  },
  es: {
    country: 'País',
    selectCountry: 'Seleccionar país',
    filterCountries: 'Filtrar países',
    noResults: 'Sin resultados',
  },
  pl: {
    country: 'Kraj',
    selectCountry: 'Wybierz kraj',
    filterCountries: 'Filtruj kraje',
    noResults: 'Brak wyników',
  },
  pt: {
    country: 'País',
    selectCountry: 'Selecionar país',
    filterCountries: 'Filtrar países',
    noResults: 'Sem resultados',
  },
  sv: {
    country: 'Land',
    selectCountry: 'Välj land',
    filterCountries: 'Filtrera länder',
    noResults: 'Inga resultat',
  },
  fi: {
    country: 'Maa',
    selectCountry: 'Valitse maa',
    filterCountries: 'Suodata maat',
    noResults: 'Ei tuloksia',
  },
}
