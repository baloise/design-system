/**
 * FileList Utils
 * -------------------------------
 * Utils to work with the FileList object. Unfortunately, jsdom does not
 * support the DataTransfer API, so we were not able to write any
 * unit test for it.
 */

export const toFileArray = (list?: FileList): File[] => {
  return Array.from(list ? list : [])
}

export const toFileList = (files?: File[]): FileList => {
  const dataTransfer = new DataTransfer()
  if (files && files.length > 0) {
    files.forEach(file => dataTransfer.items.add(file))
  }
  return dataTransfer.files
}
