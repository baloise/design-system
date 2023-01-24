import { FileUploadRejectedFile, FileUploadRejectionReason } from '../bal-file-upload.type'

type FileOptions = {
  accept?: string
  maxFileSize?: number | undefined
  maxBundleSize?: number | undefined
  maxFiles?: number | undefined
}

type ValidateFileArrayReturn = {
  validFiles: File[]
  invalidFiles: FileUploadRejectedFile[]
}

export const validateFileArray = (state: File[], files: File[], fileOptions: FileOptions): ValidateFileArrayReturn => {
  const validFiles = []
  const invalidFiles: FileUploadRejectedFile[] = []

  for (let index = 0; index < files.length; index++) {
    const file = files[index]
    if (file) {
      const reasons: FileUploadRejectionReason[] = []

      if (fileOptions.accept && fileOptions.accept.split(' ').join('').split(',').indexOf(file.type) === -1) {
        reasons.push(FileUploadRejectionReason.BAD_EXTENSION)
      }

      if (fileOptions.maxFileSize !== undefined && file.size > fileOptions.maxFileSize) {
        reasons.push(FileUploadRejectionReason.FILE_TOO_BIG)
      }

      const stateBundleSize = state.map(f => f.size).reduce((a, b) => a + b, 0)
      const filesBundleSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
      const bundleSize = stateBundleSize + filesBundleSize
      if (fileOptions.maxBundleSize !== undefined && bundleSize > fileOptions.maxBundleSize) {
        reasons.push(FileUploadRejectionReason.FILE_SIZE_SUM_TOO_BIG)
      }

      const amountOfFiles = state.length + files.length
      if (fileOptions.maxFiles !== undefined && amountOfFiles > fileOptions.maxFiles) {
        reasons.push(FileUploadRejectionReason.TOO_MANY_FILES)
      }

      const areFilesEqual = (fileA: File, fileB: File) =>
        fileA.size === fileB.size && fileA.name === fileB.name && fileA.type === fileB.type

      const duplicatedFiles = state.filter(f => areFilesEqual(f, file))
      if (duplicatedFiles.length > 0) {
        reasons.push(FileUploadRejectionReason.DUPLICATED_FILE)
      }

      if (reasons.length > 0) {
        invalidFiles.push({ file, reasons })
      } else {
        validFiles.push(file)
      }
    }
  }

  return {
    validFiles: validFiles,
    invalidFiles: invalidFiles,
  }
}
