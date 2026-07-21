/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalEvents {
  export enum FileUploadRejectionReason {
    BAD_EXTENSION = 'BAD_EXTENSION',
    FILE_TOO_BIG = 'FILE_TOO_BIG',
    FILE_SIZE_SUM_TOO_BIG = 'FILE_SIZE_SUM_TOO_BIG',
    TOO_MANY_FILES = 'TOO_MANY_FILES',
    DUPLICATED_FILE = 'DUPLICATED_FILE',
  }

  export interface FileUploadRejectedFile {
    reasons: FileUploadRejectionReason[]
    file: File
  }

  export interface BalFileUploadCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalFileUploadElement
  }

  export type BalFileUploadChangeDetail = File[]
  export type BalFileUploadChange = BalFileUploadCustomEvent<BalFileUploadChangeDetail>

  export type BalFileUploadFilesAddedDetail = File[]
  export type BalFileUploadFilesAdded = BalFileUploadCustomEvent<BalFileUploadFilesAddedDetail>

  export type BalFileUploadFilesRemovedDetail = File[]
  export type BalFileUploadFilesRemoved = BalFileUploadCustomEvent<BalFileUploadFilesRemovedDetail>

  export type BalFileUploadRejectedFileDetail = FileUploadRejectedFile
  export type BalFileUploadRejectedFile = BalFileUploadCustomEvent<BalFileUploadRejectedFileDetail>

  export type BalFileUploadInputClickDetail = MouseEvent
  export type BalFileUploadInputClick = BalFileUploadCustomEvent<BalFileUploadInputClickDetail>

  export type BalFileUploadBlurDetail = FocusEvent
  export type BalFileUploadBlur = BalFileUploadCustomEvent<BalFileUploadBlurDetail>

  export type BalFileUploadFocusDetail = FocusEvent
  export type BalFileUploadFocus = BalFileUploadCustomEvent<BalFileUploadFocusDetail>
}
