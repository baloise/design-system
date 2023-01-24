type ValidateFileArrayReturn = {
  validFiles: File[]
  invalidFiles: File[]
}

export const validateFileArray = (state: File[], files: File[]): ValidateFileArrayReturn => {
  return {
    validFiles: [], // the added ones
    invalidFiles: [], // the rejected ones
  }
}
