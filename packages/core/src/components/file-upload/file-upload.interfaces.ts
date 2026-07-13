export const FILE_UPLOAD_REJECTION_REASONS = [
  'BAD_EXTENSION',
  'FILE_TOO_BIG',
  'FILE_SIZE_SUM_TOO_BIG',
  'TOO_MANY_FILES',
  'DUPLICATED_FILE',
] as const

export type FileUploadRejectionReason = (typeof FILE_UPLOAD_REJECTION_REASONS)[number]

export interface FileUploadRejectedFile {
  reasons: FileUploadRejectionReason[]
  file: File
}

export interface FileUploadCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: any
}

export type FileUploadChangeDetail = File[]
export type FileUploadChange = FileUploadCustomEvent<FileUploadChangeDetail>

export type FileUploadFilesAddedDetail = File[]
export type FileUploadFilesAdded = FileUploadCustomEvent<FileUploadFilesAddedDetail>

export type FileUploadFilesRemovedDetail = File[]
export type FileUploadFilesRemoved = FileUploadCustomEvent<FileUploadFilesRemovedDetail>

export type FileUploadRejectedFileDetail = FileUploadRejectedFile
export type FileUploadRejectedFileEvent = FileUploadCustomEvent<FileUploadRejectedFileDetail>

export type FileUploadInputClickDetail = MouseEvent
export type FileUploadInputClick = FileUploadCustomEvent<FileUploadInputClickDetail>

export type FileUploadBlurDetail = FocusEvent
export type FileUploadBlur = FileUploadCustomEvent<FileUploadBlurDetail>

export type FileUploadFocusDetail = FocusEvent
export type FileUploadFocus = FileUploadCustomEvent<FileUploadFocusDetail>
