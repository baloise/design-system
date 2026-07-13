import { I18n } from '../../interfaces'

interface I18nDsFileUpload {
  dropZoneLabel: string
  selectedFilesLabel: string
  removeFileLabel: string
}

export const i18nDsFileUpload: I18n<I18nDsFileUpload> = {
  en: {
    dropZoneLabel: 'Drop files or browse',
    selectedFilesLabel: 'Selected files',
    removeFileLabel: 'Remove',
  },
  de: {
    dropZoneLabel: 'Dateien ablegen oder durchsuchen',
    selectedFilesLabel: 'Ausgewählte Dateien',
    removeFileLabel: 'Entfernen',
  },
  fr: {
    dropZoneLabel: 'Déposez les fichiers ou parcourez',
    selectedFilesLabel: 'Fichiers sélectionnés',
    removeFileLabel: 'Supprimer',
  },
  it: {
    dropZoneLabel: 'Rilascia i file o sfoglia',
    selectedFilesLabel: 'File selezionati',
    removeFileLabel: 'Rimuovi',
  },
  nl: {
    dropZoneLabel: 'Zet bestanden neer of blader',
    selectedFilesLabel: 'Geselecteerde bestanden',
    removeFileLabel: 'Verwijderen',
  },
  es: {
    dropZoneLabel: 'Suelta archivos o busca',
    selectedFilesLabel: 'Archivos seleccionados',
    removeFileLabel: 'Eliminar',
  },
  pl: {
    dropZoneLabel: 'Upuść pliki lub przeglądaj',
    selectedFilesLabel: 'Wybrane pliki',
    removeFileLabel: 'Usuń',
  },
  pt: {
    dropZoneLabel: 'Solte ficheiros ou procure',
    selectedFilesLabel: 'Ficheiros selecionados',
    removeFileLabel: 'Remover',
  },
  sv: {
    dropZoneLabel: 'Släpp filer eller bläddra',
    selectedFilesLabel: 'Valda filer',
    removeFileLabel: 'Ta bort',
  },
  fi: {
    dropZoneLabel: 'Pudota tiedostot tai selaa',
    selectedFilesLabel: 'Valitut tiedostot',
    removeFileLabel: 'Poista',
  },
}
