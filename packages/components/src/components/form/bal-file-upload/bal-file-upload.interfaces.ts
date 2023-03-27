/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />
namespace BalEvents {
  export type BalFileUploadChangeDetail = File[]
  export interface BalFileUploadChange extends CustomEvent {
    detail: BalFileUploadChangeDetail
    target: HTMLBalFileUploadElement
  }

  export type BalFileUploadFilesAddedDetail = File[]
  export interface BalFileUploadFilesAdded extends CustomEvent {
    detail: BalFileUploadFilesAddedDetail
    target: HTMLBalFileUploadElement
  }

  export type BalFileUploadFilesRemovedDetail = File[]
  export interface BalFileUploadFilesRemoved extends CustomEvent {
    detail: BalFileUploadFilesRemovedDetail
    target: HTMLBalFileUploadElement
  }

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

  export type BalFileUploadRejectedFileDetail = FileUploadRejectedFile
  export interface BalFileUploadRejectedFile extends CustomEvent {
    detail: BalFileUploadRejectedFileDetail
    target: HTMLBalFileUploadElement
  }

  export type BalFileUploadInputClickDetail = MouseEvent
  export interface BalFileUploadInputClick extends CustomEvent {
    detail: BalFileUploadInputClickDetail
    target: HTMLBalFileUploadElement
  }

  export type BalFileUploadBlurDetail = FocusEvent
  export interface BalFileUploadBlur extends CustomEvent {
    detail: BalFileUploadBlurDetail
    target: HTMLBalFileUploadElement
  }

  export type BalFileUploadFocusDetail = FocusEvent
  export interface BalFileUploadFocus extends CustomEvent {
    detail: BalFileUploadFocusDetail
    target: HTMLBalFileUploadElement
  }
}
