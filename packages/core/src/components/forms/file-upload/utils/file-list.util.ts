export const toFileArray = (list?: FileList): File[] => {
  return Array.from(list ?? [])
}

export const toFileList = (files?: File[]): FileList => {
  const dataTransfer = new DataTransfer()
  if (files && files.length > 0) {
    files.forEach(file => dataTransfer.items.add(file))
  }
  return dataTransfer.files
}
