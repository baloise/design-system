export enum FileUploadRejectionReason {
    BAD_EXTENSION = 'BAD_EXTENSION',
    FILE_TOO_BIG = 'FILE_TOO_BIG',
    FILE_SIZE_SUM_TOO_BIG = 'FILE_SIZE_SUM_TOO_BIG',
    TOO_MANY_FILES = 'TOO_MANY_FILES',
    DUPLICATED_FILE = 'DUPLICATED_FILE'
}

export interface FileUploadRejectedFile {
  reasons: FileUploadRejectionReason[]
  file: File
}
